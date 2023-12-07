import { Injectable } from '@angular/core';

import { CountySearchIdResponse } from '../model/county-search-id-response';
import { BehaviorSubject } from 'rxjs';
import { CountyNatalityFilter } from '../model/county-natality-filter';
import { AbnormalFiltersResponse } from '../model/abnormal-filters-response';


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

  // Datos grafico abnormalFilters
  private dataAbnormalFilters = new BehaviorSubject<AbnormalFiltersResponse | null>(null);
  dataAbnormalAsObservable$ = this.dataAbnormalFilters.asObservable();
  setDataAbnormalFilters(data: AbnormalFiltersResponse) {
    console.log("Datos de setDataAbnormalFilters (antes de emitir): ", data);
    if (data) {
      this.dataAbnormalFilters.next(data);
    } else {
      console.error("Intento de emitir datos nulos desde setDataAbnormalFilters.");
    }
  }
}
