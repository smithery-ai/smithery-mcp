import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ZodRawShape } from "zod";
import { SmitheryClient } from "../client/smithery.client.js";
import { McpClientListEnum } from "../interfaces/mcp-client-list.type.js";
import { ITool } from "../interfaces/tool.js";
import { zodType } from "../interfaces/zod.type.js";
export class McpInstallerTool implements ITool {
  name: string = "mcp-installer";
  description: string = "Install the MCP server without configuration";
  parameters: ZodRawShape = {
    qualifiedName: zodType.qualifiedName.describe(
      "The qualified name of the MCP server to install. ex) @bbangjooo/mcp-finder-mcp-server"
    ),
    client: zodType.client.describe("The client to install"),
  };
  fn: (params: ZodRawShape) => Promise<CallToolResult> = async (params) => {
    const qualifiedName = params.qualifiedName.toString();
    const client = params.client.toString() as McpClientListEnum;
    const smitheryClient = new SmitheryClient();
    const foundServer = await smitheryClient.getServerDetailOrNull(
      qualifiedName
    );
    if (!foundServer) {
      return {
        content: [{ type: "text", text: `Server not found: ${qualifiedName}` }],
      };
    }
    const installCommand = await smitheryClient.getInstallCommand(
      qualifiedName,
      client
    );
    return {
      content: [{ type: "text", text: installCommand }],
    };
  };
}
