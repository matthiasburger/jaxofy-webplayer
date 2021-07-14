import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  url: string | null = null;
  constructor(private http: HttpClient) { }

  uploadFile(data: any): Observable<any> {
    this.url = 'http://localhost:8000/api/v1/tracks';

    return this.http.post(this.url, data)
      .pipe(
        map((res: any) => res.json())
      );


    /*
    return this.http.post(this.url, data)
      .pipe(map(this.handleData)).subscribe(result => {
        console.log(result);
      });*/
  }

  private handleData(res: Response): any {
    const data = res.json();
    return data;
  }
  private handleError(error: Response | any): Observable<any> {
    return Observable.throw('API failed');
  }
}
