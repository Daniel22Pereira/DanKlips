import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.css']
})
export class ModalShareComponent {

  @Output() addVideo = new EventEmitter<string>();
  @Output() showModal = new EventEmitter<boolean>();

  videoLink = new FormControl('', [Validators.required, this.youtubeLinkValidator]);
  invalidLink = false;

  shareVideo(): void {
    if (this.videoLink.valid) {
      this.addVideo.emit(this.videoLink.value);
      this.videoLink.reset();
      this.showModal.emit(true);
      this.invalidLink = false;
    } else {
      this.invalidLink = true;
    }
  }

  closeModal(): void {
    this.videoLink.reset();
    this.showModal.emit(true);
  }

  youtubeLinkValidator(control: FormControl): { [s: string]: boolean } {
    const url = control.value;
    const regex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/;
    if (!url || !regex.test(url)) {
      return {invalidYoutubeLink: true};
    }
    return null;
  }
}