import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material';

import { Dish } from './../shared/dish';

import { DishService } from './../services/dish.service';
//let the service fetch information for us

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[]; //*no longer need to paste information from class DISHES

  selectedDish: Dish;

  constructor(private dishService: DishService) { } //every time when called, it'll create a new dishService object

  ngOnInit() {
    this.dishService.getDishes()
      .then(dishes => this.dishes = dishes); //* fetch information from Angular Service instead
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
