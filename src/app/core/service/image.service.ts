import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImageList} from "../model/image-list";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private S3_URL = environment.s3BaseApiUrl + '/external-share.system1bio/littleviewer/littleviewer_images.json';
  private IMAGE_URL_DEFAULT = environment.imageBaseApiUrl + '/{path}/full/512,/0/default.jpg';
  private IMAGE_URL_MODIFIED = environment.imageBaseApiUrl + '/{path}/full/512,/0/default.jpg?white_point={white_point}&colorize=hue:{hue}';

  constructor(private client: HttpClient) {}

  getImageData() : Observable<ImageList> {
    return this.client.get<ImageList>(this.S3_URL);
  }

  getImage(path: string): Observable<Blob> {
    let url = this.IMAGE_URL_DEFAULT.replace('{path}', path);
    return this.client.get(url, { responseType: 'blob' });
  }

  getModifiedImage(path: string, hue: string, contrast: string): Observable<Blob> {
    let url = this.IMAGE_URL_MODIFIED.replace('{path}', path)
      .replace('{white_point}', contrast)
      .replace('{hue}', hue);
    return this.client.get(url, { responseType: 'blob' });
  }
}
