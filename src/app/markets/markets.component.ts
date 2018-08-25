import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from '../StockService';
import { IStock } from '../IStock';
import {StockFilterPipe} from '../stock-filter.pipe';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy {

  myStocks = [];
  connection;
  filterTerm: string;

  constructor(private stockService:StockService) { }

  ngOnInit() {
    //generate a connection to the server
    this.stockService.generateConnection((initialStockData : IStock[]) => {
      this.addToOrModifyStockList(initialStockData);
      this.subsribeToStockService();
    },
    (error) => {
      alert('Failed to connect, please try again later');
    });
  }

  //subscribes to the stock service to listen to stock price change events
  subsribeToStockService(){
    this.connection = this.stockService.getStockData().subscribe((stockData : IStock[]) => {  
      this.addToOrModifyStockList(stockData);
    });
  }

  //adds a new stock or modifies an existing one
  addToOrModifyStockList(data : IStock[]){
    for(let i=0; i<data.length; i++){
      let index = this.myStocks.findIndex((stock) => {
        return stock.id === data[i].id;
      });
      
      //if we found the stock in our list, then we update the data
      if(index > -1){
        this.myStocks[index].price = data[i].price;
        this.myStocks[index].status = data[i].status;
      }
      //if we haven't found the stock in our list, then we add it to our list
      else{
        this.myStocks.push(data[i]);  
      }
    }
  }

  //fetches the relevant image based on the stock status
  fetchImage(stock : IStock){
      return `src/images/${stock.status}.png`
  }

  //destroys the subscribtion upon connection
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
