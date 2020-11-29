import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cat } from '../models/cat';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private cats: Array<Cat> = [];

  constructor(private apiService: ApiService) {
    this.apiService.getAllCats().subscribe(
      cats => {
        this.cats = cats.map((cat: Cat) => { cat.id = +cat._id; return cat; });
        console.log();
      }
    );
  }

  /* public getAllCats(): Observable<Cat[]> {
    return this.apiService.getAllCats()
      .pipe(
        tap(cats => {
          this.cats = cats;
        })
      );
  } */

  getAllCats(): Cat[] {
    return this.cats;
  }

  getSingleCat(id: number): Cat {
    return this.cats.find(cat => cat.id === id);
  }

  setLikeToCat(id: number, increase: number): Cat[] {
    const cat = this.cats.find(item => item.id === id);
    cat.like += increase;
    return this.cats;
  }

  createNewCat(cat: Cat): Cat[] {
    cat.id = this.cats.length + 2;
    this.cats.push(cat);
    return this.cats;
  }

  removeCat(id: number): Cat[] {
    const removeIndex = this.cats.findIndex(cat => cat.id === id);
    for (let i = removeIndex; i < this.cats.length; i++) {
      --this.cats[i].id;
    }
    this.cats.splice(removeIndex, 1);
    return this.cats;
  }

  editCat(cat: Cat): Cat[] {
    // const editIndex = this.cats.findIndex(storeCat => storeCat.id === cat.id);
    this.cats[cat.id - 1] = cat;
    return this.cats;
  }

}
