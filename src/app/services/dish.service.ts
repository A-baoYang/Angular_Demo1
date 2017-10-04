import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { Dish } from './../shared/dish';
import { DISHES } from './../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return Observable.of(DISHES).delay(1500);
    // return Promise.resolve(DISHES);
    // to supply js array to any other applications
  }

  getDish(id: number): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(1500);
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.feature))[0]).delay(1500);
    //return Promise.resolve(DISHES.filter((dish) => (dish.feature))[0]);
  }

  getDishIds(): Observable<number[]> {
    return Observable.of(DISHES.map(dish => dish.id)).delay(1500);
    // use RxJS map function
  }

}
