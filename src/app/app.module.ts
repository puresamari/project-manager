import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OverviewCardComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
