import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { ApiFetchService } from '../services/apifetch.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieCard } from '../interfaces/MovieCard';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    imports: [CommonModule, FormsModule, HttpClientModule, MovieCardComponent],
    providers: [ApiFetchService]
})

export class ContentComponent {
    public searchedTerm: string = "";
    public searchResult$: MovieCard[] = [];

    constructor(private apiFetchService: ApiFetchService) { }

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
    handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.search();
        }
    }

    public search() {
        this.apiFetchService.getMoviesByTitle(this.searchedTerm)
            .subscribe(movies => this.searchResult$ = movies)
        this.searchedTerm = "";
    }
}
