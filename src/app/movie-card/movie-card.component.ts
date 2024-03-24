import { Component, Input, OnInit } from '@angular/core';
import { MovieCard } from '../interfaces/MovieCard';
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

  ngOnInit(): void {
    let localStorageBookmarks = JSON.parse(localStorage.getItem("bookmarks")!);

    if (localStorageBookmarks !== null) {
      if (localStorageBookmarks.includes(this.movie.imdbID)) {
        this.isFavorite = true
      }
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    let localStorageBookmarks = JSON.parse(localStorage.getItem("bookmarks")!);

    if (localStorageBookmarks == null) {
      localStorageBookmarks = []
    }

    if (this.isFavorite && !localStorageBookmarks.includes(this.movie.imdbID)) {
      localStorageBookmarks.push(this.movie.imdbID)
      localStorage.setItem("bookmarks", JSON.stringify(localStorageBookmarks))
    }

    if (!this.isFavorite) {
      const index = localStorageBookmarks.indexOf(this.movie.imdbID)
      localStorageBookmarks.splice(index, 1)
      localStorage.setItem("bookmarks", JSON.stringify(localStorageBookmarks))
    }
  }
}