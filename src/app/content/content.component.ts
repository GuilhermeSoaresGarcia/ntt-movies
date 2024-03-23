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
    private subscription: Subscription = new Subscription();

    constructor(private apiFetchService: ApiFetchService) { }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    // ngOnInit(): void {
    //     if (this.searchResult$.length == 0) {
    //         let result
    //         do {
    //             result = this.apiFetchService.getMovieById(`tt${this.generateRandomNumber()}`)
    //                 .subscribe((response) => console.log(response))
    //         } while ("Response" in result)

    //         this.searchResult$.push(result)
    //         console.log(this.searchResult$)
    //     }
    // }

    // private generateRandomNumber(): number {
    //     return Math.floor(Math.random() * (3900000 - 1000000) + 1000000);
    // }

    @HostListener('window:keydown', ['$event'])
    handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.search();
        }
    }

    public search() {
        this.subscription = this.apiFetchService.getMoviesByTitle(this.searchedTerm)
            .subscribe(movies => this.searchResult$ = movies);
        this.searchedTerm = "";
    }
}
