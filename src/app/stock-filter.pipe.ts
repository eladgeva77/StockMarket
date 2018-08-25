import { Pipe, PipeTransform } from '@angular/core';
import { IStock } from './IStock';

@Pipe({
  name: 'stockFilter'
})
export class StockFilterPipe implements PipeTransform {

  transform(stocks: IStock[], filterTerm: string): any {

    //check if search term is undefined or null or empty, then we return the entire array
    if(!filterTerm || filterTerm===""){
      return stocks;
    }

    //we split our term by commas and remove spaces from each term
    let terms : string[] = filterTerm.split(',');
    terms.forEach((term, index, array) => {
      let modifiedTerm;
      modifiedTerm = term.toLowerCase().replace(/\s/g, '');
      array[index] = modifiedTerm;
    });

    //returns the filtered array
    return stocks.filter((stock) => {
      for(let i=0; i<terms.length; i++){
        if(terms[i]!=="" && stock.id.toLowerCase().indexOf(terms[i]) > -1){
          return true;
        }
      }
      return false;
    });
  }

}
