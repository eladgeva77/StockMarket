import { Injectable } from '@angular/core';
// import { Observable } from "../../node_modules/rxjs";
import * as io from 'socket.io-client';
import { Observable } from '../../node_modules/rxjs';
import { IStock } from './IStock';

@Injectable()
export class StockService {

    private url = 'http://localhost:3000';  
    private socket;
  
    constructor() { }
  
    generateConnection(successCallback, failureCallback){
      this.socket = io(this.url);
        // Tell server this is our first connection to it:
        this.socket.on('connect', () => {
            console.log('Connected to server !');
            
            //after connection, we request the initail stock data
            this.socket.emit('initial_connect', {}, (stocksData) => {
                //console.log(stocksData);
                successCallback(stocksData);
            });
        });

        this.socket.on('connect_error', (error) => {
          failureCallback(error);
        });
    };

    //subscribe to recieve changes in our stocks from the server
    getStockData() {
      let observable = new Observable<IStock[]>(observer => {
        this.socket.on('new_data', (modifiedOrNewStocks : IStock[]) => {
          //console.log(data);
          observer.next(modifiedOrNewStocks);  
        });
      });    
      return observable;
    }
  }