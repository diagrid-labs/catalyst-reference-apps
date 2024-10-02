export class ServiceApiToken {
  service: string;
  api_token: string;
  http_url:string;
  grpc_url:string;

  constructor(service: string, api_token: string,http_url:string,grpc_url:string) {
    this.service = service;
    this.api_token = api_token;
    this.grpc_url = grpc_url;
    this.http_url = http_url;
  }
}
