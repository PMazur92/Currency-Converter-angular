import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Currency } from '../../shared/classes/currency';
import { LoggerService } from '../logger/logger.service';
import { Result } from '../../shared/classes/result';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  readonly currenciesUrl = 'https://free.currencyconverterapi.com/api/v6';
  readonly testUrl = 'assets/currencies.json'; // remove
  readonly resultUrl = 'assets/convert.json'; // remove

  constructor(private http: HttpClient,
              private logger: LoggerService) { }

  getCurrencies(): Observable<Currency []>{
    const url = `${this.currenciesUrl}/currencies`;
    return this.http.get<Currency[]>(this.testUrl /* url */).pipe(
      map(response => Object.values(response['results'])) 
    );
  }

  getResult(converFrom: Currency, convertTo: Currency): Observable<Result>{
    const id = `${converFrom.id}_${convertTo.id}`
    return this.getResultfromId(id);
  }

  getResultfromId(id: string): Observable<Result>{
    const url = `${this.currenciesUrl}/convert?q=${id}&compact=y`;
    return this.http.get<Result>(this.resultUrl /* url */).pipe(
      map(response => {
        // this.logger.log(response[id]);
        return response[id];
      })
    );
  }

}
