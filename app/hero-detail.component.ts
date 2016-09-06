import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
	selector : 'my-hero-detail',
	template : `<div *ngIf="hero">
		  			<h2>{{hero.name}} details!</h2>
		  			<div><label>id: </label>{{hero.id}}</div>
		  			<div>
		  				<label>name: </label>
		  				<input [(ngModel)]="hero.name" placeholder="name">
		  			</div>
  				</div>
  				<button (click)="goBack()">Back</button>
          <button (click)="save()">Save</button>`,
  	styles : [`label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}
button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer; cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #ccc; 
  cursor: auto;
}
`]
})
export class HeroDetailComponent implements OnInit{
	constructor(
 	 private heroService: HeroService,
 	 private route: ActivatedRoute) {
	}
	@Input()
	hero : Hero
	ngOnInit(): void {
	  this.route.params.forEach((params: Params) => {
	    let id = +params['id'];
	    this.heroService.getHero(id)
	      .then(hero => this.hero = hero);
	});
	}
	goBack(): void {
  		window.history.back();
	}
  save() : void{
      this.heroService.update(this.hero)
      .then(this.goBack);
  }
}