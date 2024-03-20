import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import {ClipsRoutes} from './clips/clips-routing.module';
import { AuthComponent } from './auth/auth.component';
import { CreateComponent } from './auth/create/create.component';
import { SpamComponent } from './clips/spam/spam.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clips/list', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth/create',
    component: CreateComponent,
  },
  {
    path: 'spam',
    component: SpamComponent,
  },
  ...ClipsRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
