import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from './services/youtube.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ClipListComponent } from './clips/clip-list/clip-list.component';
import { ClipItemComponent } from './clips/clip-item/clip-item.component';
import { ModalShareComponent } from './modals/share/modal-share.component';
import { ModalDeleteComponent } from './modals/delete/modal-delete.component';
import { ClipDetailsComponent } from './clips/clip-details/clip-details.component';
import { ClipDetailsListComponent } from './clips/clip-details/clip-details-list/clip-details-list.component';
import { ClipDetailsItemComponent } from './clips/clip-details/clip-details-item/clip-details-item.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AuthComponent } from './auth/auth.component';
import { CreateComponent } from './auth/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    ClipListComponent,
    ClipItemComponent,
    ModalShareComponent,
    ModalDeleteComponent,
    ClipDetailsComponent,
    ClipDetailsListComponent,
    ClipDetailsItemComponent,
    SearchBoxComponent,
    AuthComponent,
    CreateComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    YoutubeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
