import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { ApiFetchService } from '../services/apifetch.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieCard } from '../interfaces/MovieCard';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription, defaultIfEmpty, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    imports: [CommonModule, FormsModule, HttpClientModule, MovieCardComponent],
    providers: [ApiFetchService]
})

export class ContentComponent implements OnDestroy {
    public searchResult$: MovieCard[] = [];
    public isLoading: boolean = false;
    private subscription: Subscription = new Subscription();
    private store = inject(Store);
    public searchTerm$: Observable<MovieCard[]>;

    constructor(private apiFetchService: ApiFetchService) {
        this.searchTerm$ = this.store.pipe(select('search', 'searchResults'))
    }

    ngOnInit(): void {
        const loadingInterval = 700;
        this.isLoading = true;

        this.subscription = this.searchTerm$.pipe(
            defaultIfEmpty([]), // Check if the observable is empty
            tap(movies => {
                if (movies == undefined) { // A sugestão do ChatGPT foi outra, mas estava resultando undefined pra mim então usei isso como condicional
                    this.fetchRandomMovies(); // Fetch random movies if the observable is empty (neste caso, não "empty" mas "undefined")
                    setInterval(() => { this.isLoading = false }, loadingInterval)
                } else {
                    this.searchResult$ = movies; // Set search results if the observable has data
                    setInterval(() => { this.isLoading = false }, loadingInterval)
                }
            })).subscribe();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
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
}
