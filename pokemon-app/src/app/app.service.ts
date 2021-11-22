import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  getPokemonInfo(pokemonUrl: string) {
    return this.http.get(pokemonUrl).pipe(
      catchError((x) => {
        console.log(x)
        throw 'Deu erro'
      })
    );
  }
}
