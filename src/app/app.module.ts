import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DesktopViewComponent } from './desktop-view/desktop-view.component';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    AppComponent,
    DesktopViewComponent,
    RootComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
