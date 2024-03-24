import { Component, HostListener, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { ApiFetchService } from '../services/apifetch.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieCard } from '../interfaces/MovieCard';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
        this.isLoading = true;
        if (this.searchTerm$ == null) {
            this.fetchRandomMovies()
        } else {
            this.subscription = this.searchTerm$.subscribe((movies) => {
                this.searchResult$ = movies
            });
        }
        this.isLoading = false;
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
