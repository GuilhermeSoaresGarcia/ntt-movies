import { Component, Input, OnInit, Output } from '@angular/core';
import { MovieCard } from '../../../interfaces/MovieCard';
import { ActivatedRoute } from '@angular/router';
import { ApiFetchService } from '../../../services/apifetch.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-card-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ApiFetchService],
  templateUrl: './movie-card-details.component.html',
})
export class MovieCardDetailsComponent implements OnInit {
  // FONTE: https://angular.io/tutorial/tour-of-heroes/toh-pt5#routable-herodetailcomponent
  public movieDetails!: MovieCard;

  // Bindings no construtor para o serviço de captura de rota (do próprio Angular) e do serviço
  // que criei para fazer as requisições na API
  constructor(private route: ActivatedRoute, private apiFetchService: ApiFetchService) { }

  ngOnInit(): void {
    this.getMovieInfo();
  }

  getMovieInfo() {
    // Pega o id da url
    const id = this.route.snapshot.paramMap.get('id');

    // Utiliza o id capturado para fazer a requisição na api utilizando o serviço criado para isso
    this.apiFetchService.getMovieById(id!)
      .subscribe(movie => this.movieDetails = movie as MovieCard)
  }
}
