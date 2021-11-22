import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  pokemonNameList: any = ['zapdos', 'moltres', 'articuno']
  pokemonUrlList: any = []

  getPokemonUrlList() {
    return this.pokemonNameList.map((pokemonName: any) => {
      return `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    })
  }

  showPokemonUrlList() {
    this.pokemonUrlList = this.getPokemonUrlList()
    this.pokemonUrlList.forEach((pokemonUrl: string) => {
      console.log(pokemonUrl)
    });
  }

  getPokemonInfo(pokemonUrl: string) {
    return this.http.get(pokemonUrl).pipe(
      catchError((x) => {
        console.log(x)
        throw 'Deu erro'
      })
    );
  }
}
