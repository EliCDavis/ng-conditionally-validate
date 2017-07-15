import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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
  MdChipsModule,
  MdIconModule
} from '@angular/material';

import { ConditionallyValidationModule } from 'ng-conditionally-validate';

import { AppComponent } from './app.component';
import { ExampleOneComponent } from './example-one/example-one.component';
import { HomeComponent } from './home/home.component';
import { InstallComponent } from './install/install.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleOneComponent,
    HomeComponent,
    InstallComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    MdToolbarModule,
    MdSidenavModule,
    MdChipsModule,
    MdInputModule,
    MdCardModule,
    MdIconModule,
    FormsModule,
    MdSlideToggleModule,
    ReactiveFormsModule,
    ConditionallyValidationModule,
    MdButtonModule,
    FlexLayoutModule,
    MdTabsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'install', component: InstallComponent },
      { path: 'example/1', component: ExampleOneComponent },
      { path: 'example/2', component: ExampleOneComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
