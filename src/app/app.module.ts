import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Point1Component } from './note/point-1.component';
import { Point2Component } from './note/point-2.component';
import { Point3Component } from './note/point-3.component';
import { Point4Component } from './note/point-4.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    Point1Component,
    Point2Component,
    Point3Component,
    Point4Component,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
