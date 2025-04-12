# MCP Installer

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
