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
}
