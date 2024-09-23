export class ServiceApiToken {
  service: string;
  apiToken: string;
  http_url:string;
  grpc_url:string;

  constructor(service: string, apiToken: string,http_url:string,grpc_url:string) {
    this.service = service;
    this.apiToken = apiToken;
    this.grpc_url = grpc_url;
    this.http_url = http_url;
  }
}
