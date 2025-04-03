export interface ISmitheryServerDetailResponse {
  qualifiedName: string;
  displayName: string;
  connections: IConnection[];
}

export interface ISmitheryServerListResponse {
  servers: ISmitheryServerListItemResponse[];
  pagination: IPagination;
}

export interface ISmitheryServerListItemResponse {
  qualifiedName: string;
  displayName: string;
  description: string;
  createdAt: string;
  useCount: number;
  homepage: string;
}

interface IPagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export interface IConnection {
  type: string;
  url?: string;
  configSchema: IConfigSchema;
}

interface IConfigSchema {
  type: string;
  required: string[];
  properties: { [key: string]: IConfigSchemaProperty };
}

interface IConfigSchemaProperty {
  type: string;
  description: string;
}
