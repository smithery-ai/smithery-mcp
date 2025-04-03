import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export class ToolResponseGenerator {
  constructor() {}

  textResponse(content: string): CallToolResult {
    return {
      content: [{ type: "text", text: content }],
    };
  }
}
