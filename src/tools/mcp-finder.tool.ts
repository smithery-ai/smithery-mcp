import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ZodRawShape } from "zod";
import { SmitheryClient } from "../client/smithery.client.js";
import { IFindMcpResponse } from "../interfaces/response/find-mcp.response.js";
import { ITool } from "../interfaces/tool.js";
import { zodType } from "../interfaces/zod.type.js";
import { ToolResponseGenerator } from "./util/tool-response.generator.js";

export class McpFinderTool implements ITool {
  private readonly smitheryClient = new SmitheryClient();
  private readonly responseGenerator = new ToolResponseGenerator();
  name: string = "find_mcp";
  description: string = "Find the MCP servers by given name";
  parameters: ZodRawShape = {
    mcpServerName: zodType.mcpServerName.describe(
      "The name of the MCP server to find"
    ),
  };

  fn: (params: ZodRawShape) => Promise<CallToolResult> = async (params) => {
    const mcpServerName = params.mcpServerName.toString();
    const searchResult = await this.smitheryClient.getServerListOrNull(
      mcpServerName
    );
    if (!searchResult) {
      return this.responseGenerator.textResponse(
        "Error occured while searching for MCP server"
      );
    }
    const response: IFindMcpResponse[] = searchResult.servers.map((tool) => ({
      qualifiedName: tool.qualifiedName,
      displayName: tool.displayName,
      description: tool.description,
      useCount: tool.useCount,
      homepage: tool.homepage,
    }));

    return this.responseGenerator.textResponse(JSON.stringify(response));
  };
}
