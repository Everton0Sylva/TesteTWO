import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CropperPosition, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.scss']
})
export class ImgCropperComponent {

  @Output()
  public emitImg = new EventEmitter();

  transform: ImageTransform = {};
  public imageChangedEvent: any = null;

  public imgCropped: any;

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      this.imageChangedEvent = { target: { files: [event.dataTransfer.files[0]] } }
    }
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }

  onRangeChange(even: any) {
    var range = parseFloat(even.target.value);
    if (!isNaN(range)) {
      let scale = parseFloat('1.' + range);
      this.transform = {
        ...this.transform,
        scale: scale
      };
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.imgCropped = event.base64;
  }

  onSetImg() {
    this.emitImg.emit(this.imgCropped);
  }
}
