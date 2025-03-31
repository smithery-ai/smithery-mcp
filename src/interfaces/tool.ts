import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { ZodRawShape } from "zod";

export interface ITool {
  name: string;
  description: string;
  parameters: ZodRawShape;
  fn: (params: ZodRawShape) => Promise<CallToolResult>;
}
