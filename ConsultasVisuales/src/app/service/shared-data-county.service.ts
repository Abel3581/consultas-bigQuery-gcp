import { Injectable } from '@angular/core';

import { CountySearchIdResponse } from '../model/county-search-id-response';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataCountyService {

  constructor() { }

  private dataSearchId = new BehaviorSubject<CountySearchIdResponse[]>([]);
  dataSearchIdBehavior$ =  this.dataSearchId.asObservable();
  setDataSearchId(data: CountySearchIdResponse[]) {
    console.log("Datos de setDataearchId (antes de emitir): ",data);
    this.dataSearchId.next(data);
  }
}
