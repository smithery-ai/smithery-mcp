import { z } from "zod";
import { McpClientListEnum } from "./mcp-client-list.type.js";

export const zodType = {
  mcpServerName: z.string(),
  qualifiedName: z.string(),
  client: z.enum(Object.values(McpClientListEnum) as [string, ...string[]]),
  connectionConfig: z.record(z.string(), z.any()),
};
