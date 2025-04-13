import { ITool } from "../interfaces/tool.js";
import { ConfigCollectorTool } from "./config-collector.tool.js";
import { McpFinderTool } from "./mcp-finder.tool.js";
import { McpInstallerTool } from "./mcp-installer.tool.js";

export const tools: ITool[] = [
  new McpFinderTool(),
  new ConfigCollectorTool(),
  new McpInstallerTool(),
];
