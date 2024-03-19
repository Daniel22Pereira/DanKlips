import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ClipsRoutes} from './clips/clips-routing.module';
import { AuthComponent } from './auth/auth.component';
import { CreateComponent } from './auth/create/create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clips/list', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'auth/create',
    component: CreateComponent,
  },
  ...ClipsRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
