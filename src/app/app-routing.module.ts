import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CatSingleComponent } from './cat-single/cat-single.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'cats/:id',
    component: CatSingleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
