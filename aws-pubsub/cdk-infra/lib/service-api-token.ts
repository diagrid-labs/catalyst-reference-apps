export class ServiceApiToken {
  service: string;
  apiToken: string;

  constructor(service: string, apiToken: string) {
    this.service = service;
    this.apiToken = apiToken;
  }
}
