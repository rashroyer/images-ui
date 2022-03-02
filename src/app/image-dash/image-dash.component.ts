import { Component, OnInit } from '@angular/core';
import {ImageService} from "../core/service/image.service";
import {Image} from "../core/model/image";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-image',
  templateUrl: './image-dash.component.html',
  styleUrls: ['./image-dash.component.css']
})
export class ImageDashComponent implements OnInit {

  images: Image[] = [];
  imageToShow: any;
  name: string = '';
  path: string = '';
  hueInput: string = '';
  contrastInput: string = '';

  constructor(private imageService: ImageService,
              private form: FormsModule) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.imageService.getImageData().subscribe(data => {
      this.images = data.images;
      this.getDefaultImage();
    });
  }

  getDefaultImage() {
    this.imageService.getImage(this.images[0].link).subscribe(blob => {
      this.loadBlobImage(blob);
    }, error => {
      console.log(error);
      alert("Could not load image");
    });
  }

  getSelectedImage(path: string) {
    this.imageService.getImage(path).subscribe(blob => {
      this.path = path;
      this.loadBlobImage(blob);
    }, error => {
      console.log(error);
      alert("Could not load image");
    });
  }

  getModifiedImage() {
    this.imageService.getModifiedImage(this.path, this.hueInput, this.contrastInput).subscribe(blob => {
      this.loadBlobImage(blob);
    }, error => {
      console.log(error);
      alert("Could not load image");
    });
  }

  loadBlobImage(data: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (data) {
      reader.readAsDataURL(data);
    }
  }

  reset() {
    this.imageToShow = undefined;
    this.path = '';
    this.hueInput = '';
    this.contrastInput = '';
    this.name = '';
  }
}
