import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { InventoryItem } from "./inventory.model";
import { addInventoryItem, loadInventoryItemsSuccess, removeInventoryItem, updateInventoryItem } from "./inventory.actions";

export type InventoryItemState = EntityState<InventoryItem>;

export const inventoryAdapter: EntityAdapter<InventoryItem> = createEntityAdapter<InventoryItem>();

export const initialState: InventoryItemState = inventoryAdapter.getInitialState();

export const inventoryReducer = createReducer(
    initialState,
    on(loadInventoryItemsSuccess, (state, { inventoryItems }) => {
        return inventoryAdapter.setAll(inventoryItems, state);
    }),
    on(addInventoryItem, (state, { inventoryItem }) => {
        const nextId: number = state.ids.length > 0 ? Math.max(...state.ids.map(id => +id)) + 1 : 1;

        return inventoryAdapter.addOne({
            ...inventoryItem,
            id: nextId
        }, state);
    }),
    on(removeInventoryItem, (state, { id }) => {
        return inventoryAdapter.removeOne(id, state);
    }),
    on(updateInventoryItem, (state, { update }) => {
        return inventoryAdapter.updateOne(update, state);
    })
);

