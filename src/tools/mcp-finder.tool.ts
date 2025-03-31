import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z, ZodRawShape } from "zod";
import { IFindMcpResponse } from "../interfaces/response/find-mcp.response.js";
import { ISmitheryServerListResponse } from "../interfaces/response/smithery.server-list.response.js";
import { ITool } from "../interfaces/tool.js";
export class McpFinderTool implements ITool {
  private readonly apiKey: string = process.env.SMITHERY_API_KEY ?? "";
  name: string = "find-mcp";
  description: string = "Find the MCP servers by given name";
  parameters: ZodRawShape = {
    mcpServerName: z.string().describe("The name of the MCP server to find"),
  };
  private readonly repositoryUrl: string = "https://registry.smithery.ai";
  fn: (params: ZodRawShape) => Promise<CallToolResult> = async (params) => {
    const mcpServerName = params.mcpServerName.toString();
    const searchResponse = await fetch(this.getSearchUrl(mcpServerName), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    const searchResult =
      (await searchResponse.json()) as ISmitheryServerListResponse;
    const response: IFindMcpResponse[] = searchResult.servers.map((tool) => {
      return {
        qualifiedName: tool.qualifiedName,
        displayName: tool.displayName,
        description: tool.description,
        useCount: tool.useCount,
        homepage: tool.homepage,
      };
    });
    return {
      content: [{ type: "text", text: JSON.stringify(response) }],
    };
  };

  private getSearchUrl(mcpServerName: string) {
    return `${this.repositoryUrl}/servers?q=${mcpServerName}&pageSize=500`;
  }
}
