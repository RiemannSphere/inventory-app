import { createAction, props } from "@ngrx/store";
import { InventoryItem } from "./inventory.model";
import { Update } from '@ngrx/entity';

export const prefix = '[Inventory Items]'

export const loadInventoryItems = createAction(`${prefix} load inventory items`);
export const loadInventoryItemsSuccess = createAction(`${prefix} load inventory items success`, props<{ inventoryItems: InventoryItem[] }>());

export const addInventoryItem = createAction(`${prefix} add inventory item`, props<{ inventoryItem: InventoryItem }>());
export const removeInventoryItem = createAction(`${prefix} remove inventory item`, props<Pick<InventoryItem, 'id'>>());
export const updateInventoryItem = createAction(`${prefix} update inventory item`, props<{ update: Update<InventoryItem> }>());
