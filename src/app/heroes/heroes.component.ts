import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero!: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(
      (heroes: Hero[]) => {
        this.heroes = heroes;
      }
    )
  }

  add(name: string){
    name = name.trim();
    if(!name) {
      return;
    }
    this.heroService.addHero(<Hero>{name}).subscribe(
      (hero: Hero) => {
        this.heroes.push(hero);
      }
    );
  }

  delete(hero: Hero){
    this.heroes = this.heroes.filter(h => h!== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }



}
