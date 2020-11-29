import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../models/cat';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  public getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>('./assets/cats.json');
  }
}
