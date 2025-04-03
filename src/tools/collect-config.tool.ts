import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ZodRawShape } from "zod";
import { ITool } from "../interfaces/tool.js";
import { zodType } from "../interfaces/zod.type.js";

export class CollectConfigTool implements ITool {
  name: string = "collect-config";
  description: string = "Collect the config from the user";
  parameters: ZodRawShape = {
    config: zodType.connectionConfig.describe("The config to collect"),
  };
  fn: (params: ZodRawShape) => Promise<CallToolResult> = async (params) => {
    return {
      content: [{ type: "text", text: "Collecting config..." }],
    };
  };
}
