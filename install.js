#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";
import os from "os";
import path from "path";
console.log("Running install.js");
const ENABLED_CLIENTS = ["cursor", "claude"];

program
  .name("mcp-installer-setup")
  .description("Setup for MCP installer")
  .version("1.0.0");

program
  .command("install")
  .requiredOption("-c, --client <type>", "client type to install mcp server")
  .requiredOption("-k, --key <key>", "smithery api key")
  .description("install mcp server to specified client")
  .action((options) => {
    if (!ENABLED_CLIENTS.includes(options.client)) {
      console.error(
        `currently only ${ENABLED_CLIENTS.join(", ")} client is supported.`
      );
      process.exit(1);
    }
    const configPath = getConfigPath(options.client);
    try {
      let config = {};
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, "utf8");
        config = JSON.parse(configContent);
      }
      addToConfig(config, "SMITHERY_API_KEY", options.key);
      addToConfig(config, "mcp-installer", {
        command: "node",
        args: [
          path.join(process.cwd(), "build", "index.js"),
          "&&",
          `SMITHERY_API_KEY=${options.key}`,
        ],
      });
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log("✅ MCP server installed successfully.");
    } catch (error) {
      console.error("❌ error occurred during installation:", error.message);
      process.exit(1);
    }
  });

program.parse();

function getConfigPath(client) {
  switch (client) {
    case "cursor":
      return path.join(os.homedir(), ".cursor", "mcp.json");
    case "claude":
      return path.join(os.homedir(), ".cursor", "mcp.json");
    default:
      throw new Error(`${client} is not supported.`);
  }
}

function addToConfig(config, key, value) {
  config[key] = value;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
