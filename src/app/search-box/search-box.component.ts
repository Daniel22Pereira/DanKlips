import { Component } from '@angular/core';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  constructor(private videoService: VideoService) { }

  search(searchTerm: string): void {
    this.videoService.setSearchTerm(searchTerm);
  }

}