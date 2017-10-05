import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
// import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Promotion } from './../shared/promotion';
// import { PROMOTIONS } from './../shared/promotions';
import { baseURL } from './../shared/baseurl';

import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class PromotionService {

  constructor(private http: Http,
    private processHttpmsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions')
      .map(res => { return this.processHttpmsgService.extractData(res); });
    //return Observable.of(PROMOTIONS).delay(1500);
    //return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id)
      .map(res => { return this.processHttpmsgService.extractData(res); });
    //return Observable.of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).delay(1500);
    //return Promise.resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
      .map(res => { return this.processHttpmsgService.extractData(res)[0]; });
    //return Observable.of(PROMOTIONS.filter((promotion) => (promotion.featured))[0]).delay(1500);
    //return Promise.resolve(PROMOTIONS.filter((promotion) => (promotion.featured))[0]);
  }

}
