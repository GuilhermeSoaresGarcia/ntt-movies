import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCard } from '../../interfaces/MovieCard';
import { ActivatedRoute } from '@angular/router';
import { ApiFetchService } from '../../services/apifetch.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-card-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ApiFetchService, Location],
  templateUrl: './movie-card-details.component.html',
})

export class MovieCardDetailsComponent implements OnInit, OnDestroy {
  public movieDetails?: MovieCard;
  public isLoading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
    private apiFetchService: ApiFetchService,
    private location: Location) { }

  ngOnInit(): void {
    this.getMovieInfo();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMovieInfo() {
    // FONTE: https://angular.io/tutorial/tour-of-heroes/toh-pt5#routable-herodetailcomponent
    const id = this.route.snapshot.paramMap.get('id');

    this.subscription = this.apiFetchService.getMovieById(id!)
      .subscribe(movie => this.movieDetails = movie as MovieCard);

    // Coloquei um pequeno intervalo porque embora a requisição da API demore cerca de 1/2 segundo,
    // o template de loading não estava entrando
    setInterval(() => this.isLoading = false, 700)
  }

  getBackToWhereYouOnceBelonged(): void {
    this.location.back();
  }
}
