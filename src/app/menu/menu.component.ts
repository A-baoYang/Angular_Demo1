import { Component, OnInit, Inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material';

import { Dish } from './../shared/dish';
import { baseURL } from './../shared/baseurl';

import { DishService } from './../services/dish.service';
//let the service fetch information for us

import { flyInOut, expand } from './../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[]; //*no longer need to paste information from class DISHES
  errMess: string;

  //selectedDish: Dish;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private baseURL) { } //every time when called, it'll create a new dishService object

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errMess => this.errMess = <any>errMess); //* fetch information from Angular Service instead
  }

  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }

}
