import { ITool } from "../interfaces/tool.js";
import { CollectConfigTool } from "./collect-config.tool.js";
import { McpFinderTool } from "./mcp-finder.tool.js";
import { McpInstallerTool } from "./mcp-installer.tool.js";

export const tools: ITool[] = [
  new McpFinderTool(),
  new CollectConfigTool(),
  new McpInstallerTool(),
];
