import {KeyValue} from '@angular/common';

export class HttpOptions<T> {
  body: T | null = null;
  headers: any;
}

export enum WebRequestMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export class WebRequest<T> {
  constructor(url: string, method: WebRequestMethod) {
    this.url = url;
    this.method = method;
  }

  url: string;
  method: WebRequestMethod;
  body: T | null = null;
  parameter?: object = {};
}
