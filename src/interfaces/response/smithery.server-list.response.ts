// {
//     "qualifiedName": "@icyxieex/topn",
//     "displayName": "Top N Line Finder",
//     "description": "Identify the most frequently occurring lines in large files efficiently. Split massive files into manageable chunks and aggregate results to deliver top N results without overwhelming memory usage.",
//     "createdAt": "2025-03-20T09:48:38.629Z",
//     "useCount": 0,
//     "homepage": "https://smithery.ai/server/@icyxieex/topn"
// }
// ],

export interface ISmitheryServerListResponse {
  servers: ISmitheryServerResponse[];
  pagination: IPagination;
}

interface ISmitheryServerResponse {
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
