import { Component, OnInit } from '@angular/core';
import { Clip } from '../../clip.model';
import { VideoService } from '../../../services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clip-details-list',
  templateUrl: './clip-details-list.component.html',
  styleUrls: ['./clip-details-list.component.css']
})
export class ClipDetailsListComponent implements OnInit {
  clipList: Clip[] = [];
  videoId: string;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoId = params['id'];

      this.videoService.getVideos().subscribe(videos => {
        this.clipList = videos.filter(video => video.id.toString() !== this.videoId);
      });

      this.videoService.videosUpdated$.subscribe(() => {
        this.videoService.getVideos().subscribe(videos => {
          this.clipList = videos.filter(video => video.id.toString() !== this.videoId);
        });
      });

      this.videoService.searchTerm$.subscribe(() => {
        this.videoService.searchVideos().subscribe(videos => {
          this.clipList = videos.filter(video => video.id.toString() !== this.videoId);
        });
      });
    });
  }
}