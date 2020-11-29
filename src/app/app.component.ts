import { Component, OnInit } from '@angular/core';
import { Cat } from './models/cat';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cats';
  catsList: Array<Cat> = [];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.catsList = this.mainService.getAllCats();
  }


}
