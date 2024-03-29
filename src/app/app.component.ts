import { Component, HostBinding, effect, signal, OnInit } from '@angular/core';
import { VideoService } from './services/video.service';
import { YoutubeService } from './services/youtube.service';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DanKlips';
  showModal = false;
  showNavbar = false;
  isAuth = false;
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  constructor(private videoService: VideoService, private youtubeService: YoutubeService, private authService: AuthService,  private router: Router) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url.startsWith('/auth');
      }
    });

    this.authService.autoLogin();
  }

  onLogout() {
    this.authService.logout();
  }

  onAddVideo(videoLink: string): void {
    this.showModal = false;
    const videoId = this.youtubeService.getVideoId(videoLink);
    this.youtubeService.setVideoData(videoId).subscribe(() => {
      const videoName = this.youtubeService.getVideoName();
      const videoThumbnail = this.youtubeService.getVideoThumbnail();
      
      const userId = this.authService.user.value?.id;
      this.videoService.addVideo(userId, videoId, videoLink, videoName, videoThumbnail);
    });
  }
}