import { Injectable } from '@angular/core';

import { CountySearchIdResponse } from '../model/county-search-id-response';
import { BehaviorSubject } from 'rxjs';
import { CountyNatalityFilter } from '../model/county-natality-filter';
import { AbnormalFiltersResponse } from '../model/abnormal-filters-response';
import { CongenitalFilters } from '../model/congenital-filters';
import { FatherRaceFilters } from '../model/father-race-filters';
import { MaternalMorbidityFilters } from '../model/maternal/maternal-morbidity-filters';


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
  // Datos grafico Congenital-abnormalities
  private dataCongenitalFilters = new BehaviorSubject<CongenitalFilters | null>(null);
  dataCongenitalAsObservable$ = this.dataAbnormalFilters.asObservable();
  setDataCongenitalFilters(data: CongenitalFilters) {
    console.log("Datos de setDataCongenitalFilters (antes de emitir): ", data);
    this.dataAbnormalFilters.next(data);
  }
  // Datos grafico FatherRace
  private dataFatherRaceFilters = new BehaviorSubject<FatherRaceFilters | null>(null);
  dataFatherRaceFiltersAsObservable$ = this.dataFatherRaceFilters.asObservable();
  setdataFatherRaceFilters(data: FatherRaceFilters) {
    console.log("Datos de setDataFatherRaceFilters (antes de emitir): ", data);
    this.dataFatherRaceFilters.next(data);
  }
  // Datos grafico Maternal
  private dataMaternalFilters = new BehaviorSubject<MaternalMorbidityFilters | null>(null);
  dataMaternalFiltersAsObservable$ = this.dataMaternalFilters.asObservable();
  setDataMaternalFilters(data: MaternalMorbidityFilters) {
    console.log("Datos de setDataMaternalFilters (antes de emitir): ", data);
    this.dataMaternalFilters.next(data);
  }

}


