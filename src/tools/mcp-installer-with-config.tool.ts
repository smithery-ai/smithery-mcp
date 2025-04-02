import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ZodRawShape } from "zod";
import { SmitheryClient } from "../client/smithery.client.js";
import { McpClientListEnum } from "../interfaces/mcp-client-list.type.js";
import { ITool } from "../interfaces/tool.js";
import { zodType } from "../interfaces/zod.type.js";

export class McpInstallerWithConfigTool implements ITool {
  name: string = "mcp-installer-with-config";
  description: string = "Install the MCP server with configuration";
  parameters: ZodRawShape = {
    qualifiedName: zodType.qualifiedName.describe(
      "The qualified name of the MCP server to install"
    ),
    client: zodType.client.describe("The client to install"),
    config: zodType.connectionConfig.describe("Configuration schema"),
  };

  fn: (params: ZodRawShape) => Promise<CallToolResult> = async (params) => {
    const qualifiedName = params.qualifiedName.toString();
    const client = params.client.toString() as McpClientListEnum;
    const smitheryClient = new SmitheryClient();
    const installCommand = await smitheryClient.getInstallCommand(
      qualifiedName,
      client
    );
    return {
      content: [{ type: "text", text: installCommand }],
    };
  };
}
