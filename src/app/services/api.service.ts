import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Path} from '../core/path';
import {Observable, of} from 'rxjs';
import {HttpOptions, WebRequest} from '../core/api-client';


@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  static readonly LOCAL_STORAGE_KEY_SESSION_TOKEN = 'SESSION_TOKEN';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.sessionToken}`,
      'Content-Type': 'application/json'
    })
  };

  baseUrl = Path.join(environment.apiUrl, this.controller());

  abstract controller(): string;

  get sessionToken(): string {
    const s: string | null = localStorage.getItem(ApiService.LOCAL_STORAGE_KEY_SESSION_TOKEN);
    if (typeof s === 'string') {
      return s;
    } else {
      return '';
    }
  }

  set sessionToken(sessionToken: string) {
    localStorage.setItem(ApiService.LOCAL_STORAGE_KEY_SESSION_TOKEN, sessionToken);
  }

  protected constructor(protected http: HttpClient) {
  }

  protected request<TIn, TOut>(request: WebRequest<TIn>): Observable<TOut> {

    const options: HttpOptions<TIn> = {
      body: null,
      headers: null
    };

    if (request.body !== null) {
      options.body = request.body;
    }

    options.headers = this.httpOptions.headers;

    return this.http.request<TOut>(request.method.toString(), request.url, options);
  }

}
