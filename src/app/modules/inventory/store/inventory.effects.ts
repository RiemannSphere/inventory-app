import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadInventoryItems, loadInventoryItemsSuccess } from './inventory.actions';
import { map } from 'rxjs/operators';
import { INVENTORY_ITEMS } from '../mocks/inventory.mock';

@Injectable()
export class InventoryEffects {
    constructor(private actions$: Actions) {}

    loadInventoryItems$ = createEffect(() => this.actions$.pipe(
        ofType(loadInventoryItems.type),
        map(() => loadInventoryItemsSuccess({ inventoryItems: INVENTORY_ITEMS }))
    ));
}