import { ITool } from "../interfaces/tool.js";
import { McpFinderTool } from "./mcp-finder.tool.js";
import { McpInstallerWithConfigTool } from "./mcp-installer-with-config.tool.js";
import { McpInstallerTool } from "./mcp-installer.tool.js";

export const tools: ITool[] = [
  new McpFinderTool(),
  new McpInstallerTool(),
  new McpInstallerWithConfigTool(),
];
