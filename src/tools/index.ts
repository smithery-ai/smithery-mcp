import { ITool } from "../interfaces/tool.js";
import { CollectConfigTool } from "./collect-config.tool.js";
import { McpFinderTool } from "./mcp-finder.tool.js";

export const tools: ITool[] = [new McpFinderTool(), new CollectConfigTool()];
