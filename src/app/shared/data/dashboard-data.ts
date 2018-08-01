import { DashboardCard } from '../classes/dashboard-card';

export const DASHBOARDCARDS: DashboardCard[] = [
    {   
        name: "EUR",
        data: [
            {id: 'EUR_PLN', id_symbol: 'PLN', title: 'EUR - PLN', price: 0.0},
            {id: 'EUR_USD', id_symbol: 'USD', title: 'EUR - USD', price: 0.0},
            {id: 'EUR_GBP', id_symbol: 'GBP', title: 'EUR - GBP', price: 0.0}
        ]   
    }, {
        name: "USD",
        data: [
            {id: 'USD_PLN', id_symbol: 'PLN', title: 'USD - PLN', price: 0.0},
            {id: 'USD_EUR', id_symbol: 'EUR', title: 'USD - EUR', price: 0.0},
            {id: 'USD_GBP', id_symbol: 'GBP', title: 'USD - GBP', price: 0.0}
        ]   
    }, {
        name: "GBP",
        data: [
            {id: 'GBP_PLN', id_symbol: 'PLN', title: 'GBP - PLN', price: 0.0},
            {id: 'GBP_EUR', id_symbol: 'EUR', title: 'GBP - EUR', price: 0.0},
            {id: 'GBP_USD', id_symbol: 'USD', title: 'GBP - USD', price: 0.0}
        ]  
    }, {
        name: "PLN",
        data: [
            {id: 'PLN_EUR', id_symbol: 'EUR', title: 'PLN - EUR', price: 0.0},
            {id: 'PLN_USD', id_symbol: 'USD', title: 'PLN - USD', price: 0.0},
            {id: 'PLN_GBP', id_symbol: 'GBP', title: 'PLN - GBP', price: 0.0}
        ]  
    }
]