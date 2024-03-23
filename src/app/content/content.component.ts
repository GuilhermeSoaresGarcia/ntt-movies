import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { ApiFetchService } from '../services/apifetch.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieCard } from '../interfaces/MovieCard';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    imports: [CommonModule, FormsModule, HttpClientModule, MovieCardComponent],
    providers: [ApiFetchService]
})

export class ContentComponent implements OnDestroy {
    public searchedTerm: string = "";
    public searchResult$: MovieCard[] = [];
    public isLoading: boolean = false;
    private subscription: Subscription = new Subscription();

    constructor(private apiFetchService: ApiFetchService) { }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    ngOnInit(): void {
        console.log(this.fetchRandomMovies())
    }

    fetchRandomMovies(): void {
        const searchedTerms = ["batman", "superman", "spider", "earth", "wind", "fire", "die", "day", "color", "love"];
        this.subscription = this.apiFetchService
            .getMoviesByTitle(searchedTerms[this.generateRandomNumber()])
            .subscribe(movies => this.searchResult$ = movies)
    }


    private generateRandomNumber(): number {
        return Math.floor(Math.random() * 10);
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.search();
        }
    }

    public search() {
        this.isLoading = true;
        this.subscription = this.apiFetchService.getMoviesByTitle(this.searchedTerm)
            .subscribe(movies => this.searchResult$ = movies);
        setInterval(() => this.isLoading = false, 700);
        this.searchedTerm = "";
    }
}
