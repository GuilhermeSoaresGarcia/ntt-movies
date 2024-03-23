import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieCard } from '../../interfaces/MovieCard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html'
})

export class MovieCardComponent implements OnInit {
  @Input() public movie!: MovieCard;   
  public isFavorite = false;
  public favorites: Array<string> = new Array<string>();


  ngOnInit(): void {
    const localStorageFavs = localStorage.getItem("favorites") as string;
    if (localStorageFavs !== null) {
      this.favorites.push(JSON.parse(localStorageFavs))
      if (this.favorites.includes(this.movie.imdbID)) {
        this.isFavorite = true;
      }
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      if (!this.favorites.includes(this.movie.imdbID)) {
        this.favorites.push(this.movie.imdbID)
        localStorage.setItem("favorites", JSON.stringify(this.favorites))
      }
    } else {
      const index = this.favorites.indexOf(this.movie.imdbID)
      this.favorites.splice(index, 1)
      localStorage.setItem("favorites", JSON.stringify(this.favorites))
    }
  }

}
