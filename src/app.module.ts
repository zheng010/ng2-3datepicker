import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './components/app-home';
import { Ng_32datepickerModule } from './ng-32datepicker';


@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    Ng_32datepickerModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
