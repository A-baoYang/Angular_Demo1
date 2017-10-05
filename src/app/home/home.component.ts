import { Component, OnInit, Inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material';

import { Dish } from './../shared/dish';
import { DishService } from './../services/dish.service';
import { Promotion } from './../shared/promotion';
import { PromotionService } from './../services/promotion.service';
import { baseURL } from './../shared/baseurl';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe(dish => this.dish = dish);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion);
  }

}
