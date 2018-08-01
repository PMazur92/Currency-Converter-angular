import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrenciesService } from './services/currencies/currencies.service';
import { LoggerService } from './services/logger/logger.service';
import { CurrencyConverterModule } from './currency-converter/currency-converter.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CurrencyConverterModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [
    CurrenciesService, 
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
