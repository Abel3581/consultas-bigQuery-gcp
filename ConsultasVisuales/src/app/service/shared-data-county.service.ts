import { Injectable } from '@angular/core';

import { CountySearchIdResponse } from '../model/county-search-id-response';
import { BehaviorSubject } from 'rxjs';
import { CountyNatalityFilter } from '../model/county-natality-filter';


@Injectable({
  providedIn: 'root'
})
export class SharedDataCountyService {


  constructor() { }

  private dataSearchId = new BehaviorSubject<CountySearchIdResponse[]>([]);
  dataSearchIdBehavior$ =  this.dataSearchId.asObservable();
  setDataSearchId(data: CountySearchIdResponse[]) {
    console.log("Datos de setDataearchId (antes de emitir): ", data);
    this.dataSearchId.next(data);
  }

  private dataCountyFilter = new BehaviorSubject<CountyNatalityFilter | null>(null);
  dataCountyFilterBehavior$ = this.dataCountyFilter.asObservable();
  setDataCountyFilter(data: CountyNatalityFilter) {
    console.log("Datos de dataCountyFilter (antes de emitir): ", data);
    this.dataCountyFilter.next(data);
  }
}
