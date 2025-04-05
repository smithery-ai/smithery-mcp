#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";
import { homedir, platform } from "os";
import { join } from "path";

const ENABLED_CLIENTS = ["cursor", "claude"];

export default async function main() {
  program
    .name("mcp-installer-setup")
    .description("Setup for MCP installer")
    .version("1.0.0")
    .requiredOption(
      "-c, --client <type>",
      "client type to install mcp server (claude, cursor)"
    )
    .requiredOption("-k, --key <smithery-api-key>", "smithery api key")
    .description("install mcp server to specified client")
    .action((options) => {
      if (!ENABLED_CLIENTS.includes(options.client)) {
        console.error(
          `currently only ${ENABLED_CLIENTS.join(", ")} client is supported.`
        );
        process.exit(1);
      }
      try {
        installMcpServer(options.client, options.key);
        console.log("✅ MCP server installed successfully.");
      } catch (error) {
        console.error("❌ error occurred during installation:", error.message);
        process.exit(1);
      }
    });

  program.parse();
}

function installMcpServer(client, key) {
  if (!ENABLED_CLIENTS.includes(client)) {
    console.error(
      `currently only ${ENABLED_CLIENTS.join(", ")} client is supported.`
    );
    process.exit(1);
  }
  const configPath = getConfigPath(client);
  let config = {};
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, "utf8");
    config = JSON.parse(configContent);
  }
  addToConfig(config["mcpServers"], "mcp-installer", {
    command: "npx",
    args: ["@bbangjo/mcp-installer"],
    env: { SMITHERY_API_KEY: key },
  });
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

function getConfigPath(client) {
  switch (client) {
    case "cursor":
      return getCursorConfigPath();
    case "claude":
      return getClaudeConfigPath();
    default:
      throw new Error(`${client} is not supported.`);
  }
}

function getCursorConfigPath() {
  const os = platform();
  switch (os) {
    case "win32":
      return join(process.env.APPDATA, "Cursor", "mcp.json");
    case "darwin":
      return join(homedir(), ".cursor", "mcp.json");
    case "linux":
      return join(homedir(), ".config", "Cursor", "mcp.json");
    default:
      return join(homedir(), ".cursor", "mcp.json");
  }
}

function getClaudeConfigPath() {
  const os = platform();
  switch (os) {
    case "win32":
      return join(process.env.APPDATA, "Claude", "claude_desktop_config.json");
    case "darwin":
      return join(
        homedir(),
        "Library",
        "Application Support",
        "Claude",
        "claude_desktop_config.json"
      );
    case "linux":
      return join(homedir(), ".config", "Claude", "claude_desktop_config.json");
    default:
      return join(homedir(), ".claude_desktop_config.json");
  }
}

function addToConfig(config, key, value) {
  config[key] = value;
}

main();
