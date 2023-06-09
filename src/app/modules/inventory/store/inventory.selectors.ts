import { createFeatureSelector } from "@ngrx/store";
import { InventoryItemState, inventoryAdapter } from "./inventory.reducers";

export const selectInventoryState = createFeatureSelector<InventoryItemState>('inventoryItems');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = inventoryAdapter.getSelectors(selectInventoryState);

export const selectInventoryItemsArray = selectAll;