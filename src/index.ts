#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { runSetup } from "./setup.js";
import { tools } from "./tools/index.js";

const server = new McpServer({
  name: "mcp-installer",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

async function main() {
  const transport = new StdioServerTransport();
  if (process.argv[2] === "setup") {
    await runSetup();
    return;
  }
  tools.forEach((tool) => {
    server.tool(tool.name, tool.description, tool.parameters, tool.fn);
  });
  await server.connect(transport);
  console.error("MCP Registry Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
