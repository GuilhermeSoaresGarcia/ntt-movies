import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { MovieCardDetailsComponent } from './content/movie-card/movie-card-details/movie-card-details.component';

export const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: "details/:id", component: MovieCardDetailsComponent }
];
