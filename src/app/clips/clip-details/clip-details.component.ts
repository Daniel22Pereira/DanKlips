import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { YoutubeService } from '../../services/youtube.service';
import { ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-clip-details',
  templateUrl: './clip-details.component.html',
  styleUrl: './clip-details.component.css'
})
export class ClipDetailsComponent implements OnInit{

  videoId: string;
  videoName: string;
  videoLink: string;
  videoThumbnail: string;

  safeVideoLink: SafeResourceUrl;

  constructor(private videoService: VideoService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private youtubeService: YoutubeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.videoId = params['id'];

      this.videoService.getVideo(this.videoId).subscribe(video => {
        this.videoName = video.name;
        this.videoThumbnail = video.thumbnail;
        const videoId = this.youtubeService.getVideoId(video.link);
        const embedLink = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&start=0`;
        this.safeVideoLink = this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
      });
    });
  }

}
