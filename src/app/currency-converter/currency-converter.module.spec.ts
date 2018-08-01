import { CurrencyConverterModule } from './currency-converter.module';

describe('CurrencyConverterModule', () => {
  let currencyConverterModule: CurrencyConverterModule;

  beforeEach(() => {
    currencyConverterModule = new CurrencyConverterModule();
  });

  it('should create an instance', () => {
    expect(currencyConverterModule).toBeTruthy();
  });
});
