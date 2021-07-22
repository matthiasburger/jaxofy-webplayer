// src/app/services/cloud.service.ts
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AudioFile} from '../interfaces/audio-file';
import {environment} from '../../environments/environment';
import {Path} from '../core/path';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  constructor(public http: HttpClient) {
  }

  getFiles(): Observable<AudioFile[]> {
    const url = Path.join(environment.apiUrl, '/tracks');
    return this.http.get<AudioFile[]>(url);
  }
}
