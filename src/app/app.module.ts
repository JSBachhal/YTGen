import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DesktopViewComponent } from './desktop-view/desktop-view.component';
import { RootComponent } from './root/root.component';
import { MobileViewComponent } from './mobile-view/mobile-view.component';
import { TumbnailComponent } from './tumbnail/tumbnail.component';
import { TumbnailMobileComponent } from './tumbnail-mobile/tumbnail-mobile.component';
import { GuessTheNameComponent } from './guess-the-name/guess-the-name.component';
import { PuzzleViewComponent } from './puzzle-view/puzzle-view.component';
import { MotivationalComponent } from './motivational/motivational.component';
import { GuessTheFlagComponent } from './guess-the-flag/guess-the-flag.component';

@NgModule({
  declarations: [
    DesktopViewComponent,
    RootComponent,
    MobileViewComponent,
    TumbnailComponent,
    TumbnailMobileComponent,
    GuessTheNameComponent,
    PuzzleViewComponent,
    MotivationalComponent,
    GuessTheFlagComponent
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
