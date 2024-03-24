import { Router } from '@angular/router';
import { Component, HostListener, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiFetchService } from '../services/apifetch.service';
import { Store } from '@ngrx/store';
import { searchResult } from '../reducers/actions/search.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ApiFetchService],
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  public searchedTerm: string = "";
  public subscription: Subscription = new Subscription();
  private store = inject(Store);

  constructor(private apiFetchService: ApiFetchService, private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  public search() {
    this.subscription = this.apiFetchService.getMoviesByTitle(this.searchedTerm)
      .subscribe((movies) => {
        this.store.dispatch(searchResult({ results: movies }));
      });
    this.router.navigate([""]);
    this.searchedTerm = "";
  }
}
