import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { SearchResult } from '../interfaces/SearchResult';
import { MovieCard } from '../interfaces/MovieCard';

@Injectable({
	providedIn: 'root'
})
export class ApiFetchService {
	private url: string = "https://www.omdbapi.com/?apikey=57ed560d";

	constructor(private http: HttpClient) { }

	public getMoviesByTitle(title: string) {
		return this.http.get<SearchResult>(`${this.url}&s=${title}`)
			.pipe(map(movies => <MovieCard[]>movies.Search))
	}

	public getMovieById(id: string) {
		return this.http.get(`${this.url}&i=${id}`)
	}
}