import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(...messages: any[]) {
    messages.forEach(elem => console.log(elem));
  }

  error(...messages: any[]) {
    messages.forEach(elem => console.error(elem));
  }
}
