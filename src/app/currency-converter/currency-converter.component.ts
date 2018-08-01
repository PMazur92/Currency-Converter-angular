import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';

import { CurrenciesService } from '../services/currencies/currencies.service';
import { Currency } from '../shared/classes/currency';
import { LoggerService } from '../services/logger/logger.service';
import { startWith, map } from 'rxjs/operators';
import { Result } from '../shared/classes/result';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {

  currencies: Currency[];
  selectedCurrencyFrom: Currency;
  selectedCurrencyTo: Currency;
  filteredCurrenciesFrom: Currency[];
  filteredCurrenciesTo: Currency[];
  converterForm: FormGroup;
  result: Result;

  constructor(private currenciesService: CurrenciesService,
    private logger: LoggerService) { }

  createForm() {
    this.converterForm = new FormGroup({
      'convertFrom': new FormControl(''),
      'amount': new FormControl('1', [
        this.correctAmount(/^\+?[1-9]\d*$/i)
      ]),
      'convertTo': new FormControl('')
    });
  }

  get convertFrom() {
    return this.converterForm.get('convertFrom');
  }

  get amount() {
    return this.converterForm.get('amount');
  }

  get convertTo() {
    return this.converterForm.get('convertTo');
  }

  correctAmount(exp: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const correct = exp.test(control.value);
      return !correct ? {'incorrect': {value: control.value}} : null;
    };
  }

  currencyNotFound(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const found = this.currencies.find(curr => 
        control.value.toUpperCase() === curr.id
      );
      return !found ? {'notFound': {value: control.value}}: null;
    }
  }

  selectFromChange() {
    if (this.convertFrom.hasError('notFound')) {
      this.selectedCurrencyFrom = undefined;
    }
  }

  selectToChange() {
    if (this.convertTo.hasError('notFound')) {
      this.selectedCurrencyTo = undefined;
    }
  }


  selectCurrencyFrom(event) {
    if (event.isUserInput) {
      const searched = event.source.value.toUpperCase();
      this.selectedCurrencyFrom = this.currencies.find((currency) => currency.id === searched);
    }
  }

  selectCurrencyTo(event) {
    if (event.isUserInput) {
      const searched = event.source.value.toUpperCase();
      this.selectedCurrencyTo = this.currencies.find((currency) => currency.id === searched);
    }
  }

  getErrorMessage() {
    const control = this.convertFrom;
    return control.hasError('required') ? 'You must enter a value' : 
    control.hasError('notFound') ? 'Currency not found' : '';
  }

  calculate(amount: number, val: number) {
    return amount*val;
  }

  onSubmit() {
    this.currenciesService.getResult(this.selectedCurrencyFrom, this.selectedCurrencyTo)
    .subscribe(
      res => {
        this.result = res as Result;
        this.result.val = this.calculate(this.amount.value, res.val);
    }, 
    (error) => this.logger.error(error)
    );
  }

  ngOnInit() {
    this.createForm();
    this.getCurrencies();
  }

  private _filterCurrencies(value: string): Currency[]{
    const filterValue = value.toUpperCase();
    return this.currencies.filter(currency => currency.id.indexOf(filterValue) === 0);
  }

  setFilters() {
    this.convertFrom.valueChanges
      .pipe(
        startWith(''),
        map(currency => currency ? this._filterCurrencies(currency): this.currencies.slice())
      )
      .subscribe(
        currencies => this.filteredCurrenciesFrom = currencies as Currency[]
      );

      this.convertTo.valueChanges
      .pipe(
        startWith(''),
        map(currency => currency ? this._filterCurrencies(currency): this.currencies.slice())
      )
      .subscribe(
        currencies => this.filteredCurrenciesTo = currencies as Currency[]
      );
  }

  setValidators() {
    this.convertFrom.setValidators(this.currencyNotFound());
    this.convertTo.setValidators(this.currencyNotFound());
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
      this.setFilters();
      this.setValidators();
    });
  }

}
