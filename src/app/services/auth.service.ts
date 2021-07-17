import {Injectable} from '@angular/core';
import {Observable, of, timer} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Path} from '../core/path';
import {WebResponse} from '../interfaces/api-dto/web-response';
import {LoginResponseDto} from '../interfaces/api-dto/login/login-response-dto';
import {flatMap, map} from 'rxjs/internal/operators';
import {LoginRequestDto} from '../interfaces/api-dto/login/login-request-dto';
import {ApiService} from './api.service';
import {WebRequest, WebRequestMethod} from '../core/api-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  jwtHelper = new JwtHelperService();
  private readonly loginCheckPeriod: number = 10 * 60 * 1000; // TODO: cross-check with API

  controller(): string {
    return 'auth';
  }

  login(model: LoginRequestDto): Observable<any> {

    // http://localhost:8000/api/v1/accounts?$filter=Username%20Deq%20D%27Dm.burger%27D

/*
    const requestAccountSearch: WebRequest<LoginRequestDto> = {
      url: Path.join(this.baseUrl),
      method: WebRequestMethod.POST,
      body: model,
      parameter: ({
        $filter: 'Username eq \'m.burger\''
      })
    };
*/
    const request: WebRequest<LoginRequestDto> = {
      url: Path.join(this.baseUrl, 'login'),
      method: WebRequestMethod.POST,
      body: model
    };

    return this.request<LoginRequestDto, WebResponse<LoginResponseDto>>(request)
      .pipe(
        map((response: WebResponse<LoginResponseDto>) => {
          if (response?.data?.items[0]?.token !== null) {
            this.sessionToken = response.data?.items[0]?.token;
            const token = this.jwtHelper.decodeToken(response.data?.items[0]?.token);
            console.log(token);
          }
        }));
  }

  // todo: implement
  refreshToken(): Observable<void> {
    return of();
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token === null || token === undefined) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  stayLoggedIn(): Observable<void> {
    return timer(0, this.loginCheckPeriod).pipe(
      flatMap(() => this.refreshToken()),
    );
  }
}
