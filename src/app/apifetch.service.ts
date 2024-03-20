import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SearchResult } from './interfaces/SearchResult';
import { MovieCard } from './interfaces/MovieCard';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchService {
  private url: string = "http://www.omdbapi.com/?apikey=57ed560d";

  constructor(private http: HttpClient) { }

  public getMoviesByTitle(title: string) {
    return this.http.get<SearchResult>(`${this.url}&s=${title}`)
      .pipe(map(movies => <MovieCard[]>movies.Search))
  }

  public getMovieById(id: string) {
    return this.http.get(`${this.url}&i=${id}`)
  }
}

export interface RootObject {
	title: string;
	year: string;
	rated: string;
	released: string;
	season: string;
	episode: string;
	runtime: string;
	genre: string;
	director: string;
	writer: string;
	actors: string;
	plot: string;
	language: string;
	country: string;
	awards: string;
	poster: string;
	ratings: any[];
	metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	seriesID: string;
	type: string;
	response: string;
}