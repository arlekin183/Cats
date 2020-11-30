import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Cat } from '../models/cat';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss']
})
export class CatsListComponent implements OnInit, OnDestroy {
  title = 'cats';
  catsList: Array<Cat> = [];
  subscriptions: Array<Subscription> = [];
  removedCat: Cat;
  @ViewChild('content', { static: false }) content: TemplateRef<any>;


  constructor(private mainService: MainService, private modalService: NgbModal, private router: Router) { }


  ngOnInit(): void {

    const getCatsSubscription = this.mainService.getAllCats()
      .subscribe(cats => {
        this.catsList = cats;
        console.log();
      });
    this.subscriptions.push(getCatsSubscription);
  }

  setLike(cat: Cat) {
    cat.likeSet ? cat.like-- : cat.like++;
    cat.likeSet = !cat.likeSet;
    this.mainService.editCat(cat);
  }

  editCat(cat?: Cat) {
    const id = cat ? cat.id : 0;
    this.router.navigate(['/cats', id]);
  }

  clickRemoveCat(cat: Cat) {
    this.removedCat = cat;
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'delete') {
        this.removeCat();
      } else {
        this.removedCat = null;
      }
    });
  }

  removeCat() {
    this.mainService.removeCat(this.removedCat.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
