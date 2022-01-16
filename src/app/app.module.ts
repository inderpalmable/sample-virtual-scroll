import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgVirtualScrollModule } from 'ag-virtual-scroll';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ScrollingModule as ExperimentalScrollingModule} from '@angular/cdk-experimental/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiScrollModule } from 'ngx-ui-scroll';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgVirtualScrollModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    UiScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
