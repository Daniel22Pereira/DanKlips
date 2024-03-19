import { Component, OnInit } from '@angular/core';
import { Clip } from '../clip.model';
import { VideoService } from '../../services/video.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('4000ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ClipListComponent implements OnInit {
  clipList: Clip[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(videos => {
      this.clipList = videos;
    });

    this.videoService.videosUpdated$.subscribe(() => {
      this.videoService.getVideos().subscribe(videos => {
        this.clipList = videos;
      });
    });

    this.videoService.searchTerm$.subscribe(() => {
      this.videoService.searchVideos().subscribe(videos => {
        this.clipList = videos;
      });
    });
  }
}