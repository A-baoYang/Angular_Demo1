import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { routes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // use the routes const from routes.ts
  ],
  exports: [
    RouterModule 
  ],
  declarations: []
})
export class AppRoutingModule { }
