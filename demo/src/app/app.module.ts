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
  MdIconModule,
  MdSelectModule
} from '@angular/material';

import { ConditionallyValidationModule } from 'ng-conditionally-validate';

import { AppComponent } from './app.component';
import { ExampleOneComponent } from './example-one/example-one.component';
import { HomeComponent } from './home/home.component';
import { InstallComponent } from './install/install.component';
import { ExampleTwoComponent } from './example-two/example-two.component';
import { ExampleThreeComponent } from './example-three/example-three.component';
import { FormValidationStatusComponent } from './form-validation-status/form-validation-status.component';
import { NgGistComponent } from './ng-gist/ng-gist.component';
import { ExampleComponent } from './example/example.component';
import { InspirationComponent } from './inspiration/inspiration.component';
import { HowToComponent } from './how-to/how-to.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleOneComponent,
    HomeComponent,
    InstallComponent,
    ExampleTwoComponent,
    ExampleThreeComponent,
    FormValidationStatusComponent,
    NgGistComponent,
    ExampleComponent,
    InspirationComponent,
    HowToComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    MdToolbarModule,
    MdSidenavModule,
    MdChipsModule,
    MdInputModule,
    MdSelectModule,
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
      { path: 'inspiration', component: InspirationComponent },
      { path: 'how-to', component: HowToComponent },
      { path: 'example/1', component: ExampleOneComponent },
      { path: 'example/2', component: ExampleTwoComponent },
      { path: 'example/3', component: ExampleThreeComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
