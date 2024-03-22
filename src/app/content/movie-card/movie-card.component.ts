import { Component, Input, OnInit } from '@angular/core';
import { MovieCard } from '../../interfaces/MovieCard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {
  @Input() public movie!: MovieCard;
  isFavorite = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    console.log(this.isFavorite)
  }
}
