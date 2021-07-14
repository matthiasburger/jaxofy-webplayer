// src/app/services/cloud.service.ts
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  files: any = [
    // tslint:disable-next-line: max-line-length
    {
      url:
        'http://localhost:8000/api/v1/play/1bcdc63c-6c02-42b3-9376-4d9a48929d12',
      name: 'Perfect',
      artist: ' Ed Sheeran'
    },
    {
      // tslint:disable-next-line: max-line-length
      url:
        'http://localhost:8000/api/v1/play/1bcdc63c-6c02-42b3-9376-4d9a48929d12',
      name: 'Man Atkeya Beparwah',
      artist: 'Nusrat Fateh Ali Khan'
    },
    {
      url:
        'http://localhost:8000/api/v1/play/1bcdc63c-6c02-42b3-9376-4d9a48929d12',
      name: 'Penny Lane',
      artist: 'The Beatles'
    }
  ];

  getFiles(): Observable<any[]> {
    return of(this.files);
  }
}