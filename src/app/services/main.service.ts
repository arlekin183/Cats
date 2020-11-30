import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Cat } from '../models/cat';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private cats: Array<Cat> = [];
  private catsSubject = new BehaviorSubject<Cat[]>([]);
  private catSubject = new BehaviorSubject<Cat>(new Cat());
  private subscriptions: Array<Subscription> = [];

  constructor(private apiService: ApiService) {
    const getCatsSubscription = this.apiService.getAllCats().subscribe(
      cats => {
        this.cats = cats.map((cat: Cat) => { cat.id = +cat._id; return cat; });
        this.catsSubject.next(this.cats);
        console.log();
      }
    );
    this.subscriptions.push(getCatsSubscription);
  }

  getAllCats(): Observable<Cat[]> {
    return this.catsSubject;
  }

  getSingleCat(id: number): Observable<Cat> {
    this.catsSubject.subscribe(cats => {
      const searchedCat = cats.find(cat => cat.id === id);
      this.catSubject.next(searchedCat);
    });
    return this.catSubject;
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

  removeCat(id: number): void {
    const removeIndex = this.cats.findIndex(cat => cat.id === id);
    for (let i = removeIndex; i < this.cats.length; i++) {
      --this.cats[i].id;
    }
    this.cats.splice(removeIndex, 1);
    this.catsSubject.next(this.cats);
  }

  editCat(cat: Cat): void {
    this.cats[cat.id - 1] = cat;
    this.catsSubject.next(this.cats);
  }

}
