import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdToolbarModule,
  MdSidenavModule,
  MdCardModule,
  MdSlideToggleModule,
  MdInputModule,
  MdTabsModule,
  MdChipsModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { ExampleOneComponent } from './example-one/example-one.component';

import { ConditionallyValidationModule } from 'ng-conditionally-validate';

@NgModule({
  declarations: [
    AppComponent,
    ExampleOneComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MdToolbarModule,
    MdSidenavModule,
    MdChipsModule,
    MdInputModule,
    MdCardModule,
    FormsModule,
    MdSlideToggleModule,
    ReactiveFormsModule,
    ConditionallyValidationModule,
    MdButtonModule,
    FlexLayoutModule,
    MdTabsModule,
    RouterModule.forRoot([
      { path: 'example/1', component: ExampleOneComponent },
      { path: 'example/2', component: ExampleOneComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
