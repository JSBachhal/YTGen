  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { DesktopViewComponent } from './desktop-view/desktop-view.component';
  import { AppComponent } from './app.component';

  const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
    { path: 'desktopView', component: DesktopViewComponent },
    { path: '**', redirectTo: 'home' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
