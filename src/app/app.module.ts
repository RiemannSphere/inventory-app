import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InventoryModule } from './modules/inventory/inventory.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { inventoryReducer } from './modules/inventory/store/inventory.reducers';
import { EffectsModule } from '@ngrx/effects';
import { InventoryEffects } from './modules/inventory/store/inventory.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InventoryModule,
    NoopAnimationsModule,
    StoreModule.forRoot({
      inventoryItems: inventoryReducer
    }),
    EffectsModule.forRoot(InventoryEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
