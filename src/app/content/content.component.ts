import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { ApiFetchService } from '../apifetch.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieCard } from '../interfaces/MovieCard';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    imports: [CommonModule, FormsModule, MovieCardComponent, HttpClientModule, HeaderComponent],
    providers: [ApiFetchService]
})
export class ContentComponent implements OnInit {
    public searchedTerm: string = "";
    public searchResult$: any = [];
    private randomNumber = Math.floor(Math.random() * 3900000);

    constructor(private fetchService: ApiFetchService) { }

    ngOnInit(): void {
        if (this.searchResult$.length == 0) {
            do {
                const movie = this.fetchService.getMovieById(`tt${this.randomNumber}`)
                console.log(movie)
                this.searchResult$.push(movie)
            } while (this.searchResult$.length < 3)
        }
    }

    public search() {
        this.fetchService.getMoviesByTitle(this.searchedTerm)
            .subscribe(movies => this.searchResult$ = movies)
        this.searchedTerm = "";
    }
}
