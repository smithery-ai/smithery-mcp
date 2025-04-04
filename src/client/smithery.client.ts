import { McpClientListEnum } from "../interfaces/mcp-client-list.type.js";
import {
  ISmitheryServerDetailResponse,
  ISmitheryServerListResponse,
} from "../interfaces/response/smithery.api.response.js";
export class SmitheryClient {
  private readonly apiKey: string = process.env.SMITHERY_API_KEY ?? "";
  private readonly baseUrl: string = "https://registry.smithery.ai";
  private fetchClient: typeof globalThis.fetch;

  constructor() {
    this.fetchClient = (url: string | URL | Request, init?: RequestInit) => {
      return globalThis.fetch(url, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
    };
  }

  async getServerList(query: string): Promise<ISmitheryServerListResponse> {
    const response = await this.fetchClient(
      `${this.baseUrl}/servers?q=${query}`
    );
    return response.json();
  }

  async getServerDetail(
    qualifiedName: string
  ): Promise<ISmitheryServerDetailResponse> {
    const response = await this.fetchClient(
      `${this.baseUrl}/servers/${qualifiedName}`
    );
    return response.json();
  }

  async getServerDetailOrNull(
    qualifiedName: string
  ): Promise<ISmitheryServerDetailResponse | null> {
    const response = await this.fetchClient(
      `${this.baseUrl}/servers/${qualifiedName}`
    );
    if (response.status === 404) {
      return null;
    }
    return response.json();
  }

  async getInstallCommand(
    qualifiedName: string,
    client: McpClientListEnum,
    config: { [key: string]: any } | null
  ): Promise<string> {
    const configString = config ? `--config ${JSON.stringify(config)}` : "";
    return `npx -y @smithery/cli@latest install ${qualifiedName} --client ${client} ${configString}`;
  }
}
