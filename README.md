# MCP Installer

[![smithery badge](https://smithery.ai/badge/@bbangjooo/mcp-finder-mcp-server)](https://smithery.ai/server/@bbangjooo/mcp-finder-mcp-server)

## Introduction

MCP Installer serves the following tools

- find-mcp: finding Model Context Protocol (MCP) servers from registry
- collect-config: collecting config to be used for connection to mcp server
- install-mcp: installing mcp server to your local machine

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- SMITHERY_API_KEY (https://smithery.ai/)

## Installation

You can install MCP Installer using the following command:

```bash
npm install @bbangjo/mcp-installer
npx @bbangjo/mcp-installer --client <client-type> --key <your-smithery-api-key>
```

Where:

- `<client-type>`: Currently supported clients are 'cursor' or 'claude'
- `<your-smithery-api-key>`: Enter your Smithery API key

Example:

```bash
npx @bbangjo/mcp-installer --client cursor --key your_smithery_api_key_here
```

Upon successful installation, you will see the message "✅ MCP server installed successfully."

**Note**: Depending on the client type, the configuration file will be created in the following locations:

- Cursor:

  - Windows: `%APPDATA%\Cursor\mcp.json`
  - macOS: `~/.cursor/mcp.json`
  - Linux: `~/.config/Cursor/mcp.json`

- Claude:
  - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
  - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - Linux: `~/.config/Claude/claude_desktop_config.json`

## Local setup

1. Install dependencies

```bash
npm install
```

2. Set up environment variables
   Create a `.env` file in the project root directory and add the following:

```
SMITHERY_API_KEY=your_api_key_here
```

3. Running the server:

```bash
npm run build
node build/index.js
```

The server will display the message "MCP Finder Server running on stdio" when successfully started.
