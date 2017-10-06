import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
// import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Dish } from './../shared/dish';
// import { DISHES } from './../shared/dishes';
// import data from server side

import { baseURL } from './../shared/baseurl';

import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular,
    private processHttpmsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
    
    //          http.get(baseURL + 'dishes')
    // .map(res => { return this.processHttpmsgService.extractData(res); });
    // return Observable.of(DISHES).delay(1500);
    // return Promise.resolve(DISHES);
    // to supply js array to any other applications
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get(); 
    
    //          http.get(baseURL + 'dishes/' + id)
    //.map(res => { return this.processHttpmsgService.extractData(res); })
    //.catch(error => { return this.processHttpmsgService.handleError(error); });
    //return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(1500);
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({ featured: true })
      .map(dishes => dishes[0]);
    
    //          http.get(baseURL + 'dishes?featured=true')
    //.map(res => { return this.processHttpmsgService.extractData(res)[0]; })
    //.catch(error => { return this.processHttpmsgService.handleError(error); });
    //return Observable.of(DISHES.filter((dish) => (dish.feature))[0]).delay(1500);
    //return Promise.resolve(DISHES.filter((dish) => (dish.feature))[0]);
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) })
      .catch(error => { return error; });
    //return Observable.of(DISHES.map(dish => dish.id)).delay(1500);
    // use RxJS map function
  }

}
