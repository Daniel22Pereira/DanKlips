import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Clip } from '../clips/clip.model';
import { BehaviorSubject, from, of } from 'rxjs';
import { Router } from '@angular/router';

const supabase = createClient(environment.supabase.url, environment.supabase.key);

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videos: Clip[] = [];

  private videosUpdated = new BehaviorSubject<void>(null);
  private searchTerm = new BehaviorSubject<string>('');

  private videoSharingLimits = {
    user: 5,
    admin: Infinity
  };

  get videosUpdated$() {
    return this.videosUpdated.asObservable();
  }

  get searchTerm$() {
    return this.searchTerm.asObservable();
  }

  constructor(private router: Router) { }

  async addVideo(userId: string, videoId: string, videoLink: string, videoName: string, videoThumbnail: string): Promise<void> {

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role, videos_shared')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error: ', userError);
      return;
    }

    if (user.videos_shared >= this.videoSharingLimits[user.role]) {
      this.router.navigate(['/spam']);
      return;
    }

    const newClip = { id: videoId, link: videoLink, name: videoName, thumbnail: videoThumbnail, addedAt: new Date().toISOString() };
    const { error } = await supabase.from('videos').insert([newClip]);
    if (error) {
      console.error('Error: ', error);
      return;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ videos_shared: user.videos_shared + 1 })
      .eq('id', userId);

    if (updateError) {
      console.error('Error: ', updateError);
      return;
    }

    this.videosUpdated.next();
  }

  getVideos() {
    return from(supabase.from('videos').select('*').order('addedAt', { ascending: false })).pipe(
      map(response => {
        this.videos = response.data as Clip[];
        return this.videos;
      })
    );
  }

  getVideo(id: string) {
    return from(supabase.from('videos').select('*').eq('id', id)).pipe(
      map(response => response.data[0] as Clip)
    );
  }

  deleteVideo(link: string) {
    supabase.from('videos').delete().match({ link }).then(() => {
      this.videosUpdated.next();
    });
  }

  setSearchTerm(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }

  searchVideos() {
    const searchTerm = this.searchTerm.getValue().toLowerCase();
    return of(this.videos.filter(video => video.name.toLowerCase().includes(searchTerm)));
  }
}