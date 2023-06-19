import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DesktopViewComponent } from './desktop-view/desktop-view.component';
import { RootComponent } from './root/root.component';
import { MobileViewComponent } from './mobile-view/mobile-view.component';

@NgModule({
  declarations: [
    DesktopViewComponent,
    RootComponent,
    MobileViewComponent
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
