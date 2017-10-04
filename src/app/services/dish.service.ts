import { Injectable } from '@angular/core';

import { Dish } from './../shared/dish';
import { DISHES } from './../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      //simulate server latency with 1.5 seconds delay
      setTimeout(() => resolve(DISHES), 1500);
    });
    // return Promise.resolve(DISHES);
    // to supply js array to any other applications
  }

  getDish(id: number): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 1500);
    });
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.feature))[0]), 1500);
    });
    //return Promise.resolve(DISHES.filter((dish) => (dish.feature))[0]);
  }

}
