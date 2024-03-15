import { Component, OnInit } from '@angular/core';
import { Clip } from '../../clip.model';
import { VideoService } from '../../../services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clip-details-list',
  templateUrl: './clip-details-list.component.html',
  styleUrl: './clip-details-list.component.css',
})
export class ClipDetailsListComponent implements OnInit {
  clipList: Clip[] = [];

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute
  ) {}

  videoId: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = params['id'];

      this.videoService.getVideos().subscribe((videos) => {
        this.clipList = videos.filter(video => video.id.toString() !== this.videoId);
      });

      this.videoService.videosUpdated$.subscribe(() => {
        this.videoService.getVideos().subscribe((videos) => {
          this.clipList = videos.filter(video => video.id.toString() !== this.videoId);
        });
      });
    });
  }

}
