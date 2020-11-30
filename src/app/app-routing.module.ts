import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CatSingleComponent } from './cat-single/cat-single.component';
import { CatsListComponent } from './cats-list/cats-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cats',
    pathMatch: 'full'
  },
  {
    path: 'cats',
    component: CatsListComponent,
  },
  {
    path: 'cats/:id',
    component: CatSingleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
