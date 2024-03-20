import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clip-item',
  templateUrl: './clip-item.component.html',
  styleUrls: ['./clip-item.component.css']
})
export class ClipItemComponent implements OnInit, OnDestroy {

  @Input() videoName: string;
  @Input() videoThumbnail: string;
  @Input() videoLink: string;
  @Input() videoId: string;

  showModal: boolean = false;
  role: string;
  private roleSubscription: Subscription;

  constructor(private videoService: VideoService, private authService: AuthService) { }

  ngOnInit() {
    this.roleSubscription = this.authService.getRole().subscribe(role => this.role = role);
  }

  ngOnDestroy() {
    this.roleSubscription.unsubscribe();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteVideo(): void {
    this.videoService.deleteVideo(this.videoLink);
  }
}