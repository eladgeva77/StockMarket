import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MarketsComponent } from './markets/markets.component';
import { StockService } from './StockService';
import { StockFilterPipe } from './stock-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MarketsComponent,
    StockFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
