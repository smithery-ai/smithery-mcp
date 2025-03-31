import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { tools } from "./tools/index.js";
dotenv.config();

const server = new McpServer({
  name: "mcp-finder",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

async function main() {
  const transport = new StdioServerTransport();
  tools.forEach((tool) => {
    server.tool(tool.name, tool.description, tool.parameters, tool.fn);
  });
  console.log(process.env.SMITHERY_API_KEY);
  await server.connect(transport);
  console.error("MCP Finder Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
