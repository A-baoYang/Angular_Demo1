import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormControlName, FormGroup, FormGroupDirective, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { 
  MatButtonModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatIconModule, 
  MatCardModule, 
  CompatibilityModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatInputModule,
  MatInput,
  MatFormFieldControl,
  MatFormFieldModule,
  MatFormField,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSliderModule,
  MatSlider,
  MatSliderChange,
  MatSliderBase,
  MatOptionModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { baseURL } from './shared/baseurl';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    MatOptionModule,
    MatFormFieldModule,
    FlexLayoutModule,
    CompatibilityModule,
    MatGridListModule,
    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [
    DishService,
    PromotionService,
    { provide: 'BaseURL', useValue: baseURL },
    ProcessHttpmsgService
  ], //inject
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
