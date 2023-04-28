import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { InventoryItem } from "./inventory.model";
import { addInventoryItem, loadInventoryItemsSuccess, removeInventoryItem, updateInventoryItem } from "./inventory.actions";

export interface InventoryItemState extends EntityState<InventoryItem> {}

export const inventoryAdapter: EntityAdapter<InventoryItem> = createEntityAdapter<InventoryItem>();

export const initialState: InventoryItemState = inventoryAdapter.getInitialState();

export const inventoryReducer = createReducer(
    initialState,
    on(loadInventoryItemsSuccess, (state, { inventoryItems }) => {
        return inventoryAdapter.setAll(inventoryItems, state);
    }),
    on(addInventoryItem, (state, inventoryItem) => {
        return inventoryAdapter.addOne(inventoryItem, state);
    }),
    on(removeInventoryItem, (state, { id }) => {
        return inventoryAdapter.removeOne(id, state);
    }),
    on(updateInventoryItem, (state, update) => {
        return inventoryAdapter.updateOne(update, state);
    })
);

