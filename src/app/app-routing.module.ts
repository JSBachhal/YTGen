import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopViewComponent } from './desktop-view/desktop-view.component';
import { MobileViewComponent } from './mobile-view/mobile-view.component';
import { TumbnailComponent } from './tumbnail/tumbnail.component';
import { TumbnailMobileComponent } from './tumbnail-mobile/tumbnail-mobile.component';
import { GuessTheNameComponent } from './guess-the-name/guess-the-name.component';
import { PuzzleViewComponent } from './puzzle-view/puzzle-view.component';
import { MotivationalComponent } from './motivational/motivational.component';
import { GuessTheFlagComponent } from './guess-the-flag/guess-the-flag.component';

const routes: Routes = [
  { path: '', redirectTo: 'mobileView', pathMatch: 'full' },
  { path: 'mobileView', component: MobileViewComponent },
  { path: 'desktopView', component: DesktopViewComponent },
  { path: 'thumbnail', component: TumbnailComponent },
  { path: 'thumbnailMobile', component: TumbnailMobileComponent },
  { path: 'guessTheName', component: GuessTheNameComponent },
  { path: 'puzzle', component: PuzzleViewComponent },
  { path: 'motivational', component: MotivationalComponent },
  { path: 'guessTheFlag', component: GuessTheFlagComponent },
  { path: '**', redirectTo: 'mobileView' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
