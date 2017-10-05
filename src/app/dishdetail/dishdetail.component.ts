import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatProgressSpinner } from '@angular/material';

import 'rxjs/add/operator/switchMap'

import { Dish } from './../shared/dish';
import { DishService } from './../services/dish.service';
import { baseURL } from './../shared/baseurl';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  // @Input()
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  //let individual dishdetail shows by routing change
  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private baseURL ) { }

  ngOnInit() {

    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id) }); //update current dish id to setPrevNext function sinutanously
      
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId); //get current dish Id
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length]; //count the prev id by math functions
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
