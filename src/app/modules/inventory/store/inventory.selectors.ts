import { createSelector } from "@ngrx/store";
import { inventoryAdapter } from "./inventory.reducers";
import { InventoryItem } from "./inventory.model";

export const selectInventoryItems = inventoryAdapter.getSelectors().selectEntities;

export const selectInventoryItemsArray = createSelector(
    selectInventoryItems,
    (inventoryItems) => {
        console.log('selector: ', inventoryItems);

        return inventoryItems ? Object.values(inventoryItems) as InventoryItem[] : [];
    }
);