# MCP Finder

## Introduction

MCP Finder is a tool for finding Model Context Protocol (MCP) servers.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- `.env` file (SMITHERY_API_KEY required)

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
