import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from '../services/currencies/currencies.service';
import { Currency } from '../shared/classes/currency';
import { LoggerService } from '../services/logger/logger.service';
import { DASHBOARDCARDS } from '../shared/data/dashboard-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currencies: Currency[];
  choosedCurrencies = {};
  dashboard = DASHBOARDCARDS;

  constructor(private currenciesService: CurrenciesService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.currenciesService.getCurrencies()
      .subscribe(currencies => {
        this.currencies = currencies;
      },
    (error) => {
      this.logger.error(error);
    },
    () => {
      this.setCurrency();
      this.getPrices();
    });

  }

  setCurrency() {
    for (const card of this.dashboard) {
      this.choosedCurrencies[card.name] = (this.currencies.find(curr => curr.id === card.name));
    }
  }

  getPrices() {
    for (const card of this.dashboard) {
      for ( const data of card.data) {
        // const id = data.id; 
        const id = 'USD_PHP'; //remove
        this.currenciesService.getResultfromId(id).subscribe(
          res => data.price = res.val
        )
      }
    }
  }
}
