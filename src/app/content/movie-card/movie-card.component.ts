import { Component, Input } from '@angular/core';
import { MovieCard } from '../interfaces/MovieCard';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {
  @Input() public movie!: MovieCard;
}
