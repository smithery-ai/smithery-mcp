import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ZodRawShape } from "zod";
import { SmitheryClient } from "../client/smithery.client.js";
import { ITool } from "../interfaces/tool.js";
import { zodType } from "../interfaces/zod.type.js";
import { ToolResponseGenerator } from "./util/tool-response.generator.js";

export class ConfigCollectorTool implements ITool {
  private readonly smitheryClient = new SmitheryClient();
  private readonly responseGenerator = new ToolResponseGenerator();
  name: string = "collect_config";
  description: string =
    "Collect the config to be used for connection to mcp server";
  parameters: ZodRawShape = {
    qualifiedName: zodType.qualifiedName.describe(
      "The qualified name of the config to collect"
    ),
  };
  fn: (params: ZodRawShape) => Promise<CallToolResult> = async (params) => {
    const qualifiedName = params.qualifiedName.toString();
    const foundServer = await this.smitheryClient.getServerDetailOrNull(
      qualifiedName
    );
    if (!foundServer) {
      return this.responseGenerator.textResponse("Server not found");
    }
    if (foundServer.connections.length === 0) {
      return this.responseGenerator.textResponse("No connections found");
    }

    const config = foundServer.connections[0].configSchema;
    const response = Object.entries(config.properties).map(
      ([key, property]) => ({
        configKey: key,
        isRequired: config.required.includes(key),
        description: property.description,
      })
    );

    return this.responseGenerator.textResponse(JSON.stringify(response));
  };
}
