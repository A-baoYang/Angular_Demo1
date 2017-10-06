import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName, FormControlDirective } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatProgressSpinner } from '@angular/material';

import 'rxjs/add/operator/switchMap'

import { Dish } from './../shared/dish';
import { DishService } from './../services/dish.service';
import { Comment } from './../shared/comment';
import { baseURL } from './../shared/baseurl';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  // @Input()
  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author Name is Required.',
      'minlength': 'Author Name needs at least 2 characters long.',
      'maxlength': 'First Name is at most 25 characters long.'
    },
    'comment': {
      'required': 'Message is Required.'
    }
  }

  //let individual dishdetail shows by routing change
  constructor(private dishService: DishService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') private baseURL ) {
      this.createForm();
    }

  ngOnInit() {
    

    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => { this.dish = null; this.errMess = <any>errmess; }); //update current dish id to setPrevNext function sinutanously
      
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      rating: '',
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId); //get current dish Id
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length]; //count the prev id by math functions
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => this.dish = dish);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  onValueChanged(data?: any) {
    if(!this.commentForm) { return; }
    const form = this.commentForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  }

}
