import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey : string = environment.youtubeApiKey;
  VideoName: string;
  VideoThumbnail: string;
  VideoLink: string;

  constructor(public http: HttpClient) { }

  getVideoId(link: string) {
    const regex = /(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
    const match = link.match(regex);
    return match && match[2].length === 11 ? match[2] : null;
  }

  setVideoData(videoId: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + this.apiKey)
      .pipe(map((res) => {
        this.VideoName = res['items'][0].snippet.title;
        this.VideoThumbnail = res['items'][0].snippet.thumbnails.maxres?.url || res['items'][0].snippet.thumbnails.high.url;
        this.VideoLink = 'https://www.youtube.com/watch?v=' + videoId;
      }));
  }

  getVideoName() {
    return this.VideoName;
  }

  getVideoThumbnail() {
    return this.VideoThumbnail;
  }

  getVideoLink() {
    return this.VideoLink;
  }

}