import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ExampleOneComponent } from './example-one/example-one.component';

import { ConditionallyValidationModule } from 'ng-conditionally-validate';

@NgModule({
  declarations: [
    AppComponent,
    ExampleOneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ConditionallyValidationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
