import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private appService: AppService) {}

  pokemonNameList: any = ['zapdos', 'moltres', 'articuno'];
  pokemonUrlList: any = [];
  pokemonData: any = [];
  pokemonStats: any = [];

  getPokemonUrlList() {
    return this.pokemonNameList.map((pokemonName: any) => {
      return `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    })
  }

  getPokemonData() {
    this.pokemonUrlList = this.getPokemonUrlList()
    return Promise.all(this.pokemonUrlList.map((pokemonUrl: string) => {
      return new Promise(resolve => {
        this.appService.getPokemonInfo(pokemonUrl)
          .subscribe((data: any) => resolve(data))
      })
    }))
  }

  getPokemonStats(pokemonsData: []) {
    return pokemonsData.map((data: any) => data.stats)
  }

  async ngOnInit() {
    this.pokemonData = await this.getPokemonData()
    this.pokemonStats = this.getPokemonStats(this.pokemonData)
    console.log(this.pokemonStats)
  }
}
