import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clip-details-item',
  templateUrl: './clip-details-item.component.html',
  styleUrl: './clip-details-item.component.css'
})
export class ClipDetailsItemComponent {

  @Input() videoName: string;
  @Input() videoThumbnail: string;
  @Input() videoLink: string;
  @Input() videoId: string;
  @Input() videoDate: string;

}
