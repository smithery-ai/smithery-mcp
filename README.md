# MCP Finder

[![smithery badge](https://smithery.ai/badge/@bbangjooo/mcp-finder-mcp-server)](https://smithery.ai/server/@bbangjooo/mcp-finder-mcp-server)

## Introduction

MCP Finder serves the following tools

- find-mcp: finding Model Context Protocol (MCP) servers from registry
- collect-config: collecting config to be used for connection to mcp server
- install-mcp: installing mcp server to your local machine

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- `.env` file (SMITHERY_API_KEY required)

### Installing via Smithery

To install mcp-finder-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@bbangjooo/mcp-finder-mcp-server):

```bash
npx -y @smithery/cli install @bbangjooo/mcp-finder-mcp-server --client claude
```

### Installation

1. Install dependencies

```bash
npm install
```

2. Set up environment variables
   Create a `.env` file in the project root directory and add the following:

```
SMITHERY_API_KEY=your_api_key_here
```

### How to Run

Running the server:

```bash
npm run build
node build/index.js
```

The server will display the message "MCP Finder Server running on stdio" when successfully started.
