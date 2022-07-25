import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;

  constructor(
    private route: ActivatedRoute, 
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.heroService.getHero(id).subscribe(
      (hero: Hero) => {
        this.hero = hero;
      }
    )
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(
        () => {
          this.goBack()
        }
      )
    }
  }

}
