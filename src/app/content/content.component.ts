import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "./movie-card/movie-card.component";
import * as moviesData from "../../assets/mock_omdb.json"

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    imports: [CommonModule, MovieCardComponent]
})
export class ContentComponent {
    private movies: any = moviesData;

    public getMovies() {
        return this.movies.Search;
    }
}
