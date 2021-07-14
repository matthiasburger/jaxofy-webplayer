import { Component, OnInit } from '@angular/core';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(public uploadService: UploadService) { }

  ngOnInit(): void {
  }

  upload(event: any): void {
    const files = event.target.files;
    const fData: FormData = new FormData();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      fData.append('formFile', files[i]);
    }
    const data = {
      filename: 'Sample File',
      id: '0001'
    };

    fData.append('data', JSON.stringify(data));

    this.uploadService.uploadFile(fData).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    );
  }
  handleResponse(response: any): void {
    console.log(response);
  }
  handleError(error: string): void {
    console.log(error);
  }
}
