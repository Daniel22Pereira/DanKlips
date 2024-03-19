import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Clip } from '../clips/clip.model';
import { BehaviorSubject, from, of } from 'rxjs';

const supabase = createClient(environment.supabase.url, environment.supabase.key);

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videos: Clip[] = [];

  private videosUpdated = new BehaviorSubject<void>(null);
  private searchTerm = new BehaviorSubject<string>('');

  get videosUpdated$() {
    return this.videosUpdated.asObservable();
  }

  get searchTerm$() {
    return this.searchTerm.asObservable();
  }

  addVideo(videoId:string, videoLink: string, videoName: string, videoThumbnail: string): void {
    const newClip = { id:videoId, link: videoLink, name: videoName, thumbnail: videoThumbnail, addedAt: new Date().toISOString() };
    supabase.from('videos').insert([newClip]).then(() => {
      this.videosUpdated.next();
    });
  }

  getVideos() {
    console.log('getVideos');
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