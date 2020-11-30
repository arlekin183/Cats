import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Cat } from '../models/cat';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-cat-single',
  templateUrl: './cat-single.component.html',
  styleUrls: ['./cat-single.component.scss']
})
export class CatSingleComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  cat = new Cat();
  changedCat = new Cat();
  @ViewChild('content', { static: false }) content: TemplateRef<any>;


  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainService, private modalService: NgbModal,
  ) {
    console.log();
  }

  ngOnInit() {
    const catId = Number(this.route.snapshot.params.id);
    if (catId !== 0) {
      this.getCurrentCat(catId);
    }

  }

  getCurrentCat(id: number) {
    this.mainService.getSingleCat(id).subscribe(cat => {
      if (!cat) { return; }
      this.cat = cat;
      this.changedCat = Object.assign({}, this.cat);
    });

  }

  save() {
    if (this.changedCat.name === '' || this.changedCat.img === '') {
      this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      });
      return;
    }
    if (this.cat.name === '') {
      this.mainService.createNewCat(this.changedCat);
    } else if (this.cat.name !== this.changedCat.name || this.cat.img !== this.changedCat.img) {
      this.mainService.editCat(this.changedCat);
    }
    this.router.navigate(['/cats']);
  }

  cancel() {
    this.router.navigate(['/cats']);
  }

  discardChanges() {
    this.changedCat = Object.assign({}, this.cat);
  }



}
