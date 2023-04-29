import { addInventoryItem, loadInventoryItemsSuccess, removeInventoryItem, updateInventoryItem } from "./inventory.actions";
import { InventoryItem } from "./inventory.model";
import { InventoryItemState, inventoryReducer } from "./inventory.reducers";

const DATE = new Date();
const ITEM = {
    id: 1,
    name: "Item",
    amount: 1,
    createdAt: DATE,
    lastUpdatedAt: DATE
};
const INVENTORY_ITEMS: InventoryItem[] = [ITEM];
const INVENTORY_STATE: InventoryItemState = {
    ids: [1],
    entities: {
        1: ITEM
    }
}

describe('Inventory Reducer', () => {
    it('should load inventory items', () => {
        const actual = inventoryReducer(undefined, loadInventoryItemsSuccess({ inventoryItems: INVENTORY_ITEMS }));
        const expected: InventoryItemState = INVENTORY_STATE;
        expect(actual).toEqual(expected);
    });

    it('should add inventory item to empty state', () => {
        const actual = inventoryReducer(undefined, addInventoryItem({ inventoryItem: ITEM }));
        const expected: InventoryItemState = INVENTORY_STATE
        expect(actual).toEqual(expected);
    });

    it('should add inventory item to non-empty state', () => {
        const actual = inventoryReducer(INVENTORY_STATE, addInventoryItem({ inventoryItem: {
            ...ITEM,
            id: 2
        } }));
        const expected: InventoryItemState = {
            ids: [1, 2],
            entities: {
                1: ITEM,
                2: {
                    ...ITEM,
                    id: 2
                }
            }
        }
        expect(actual).toEqual(expected);
    });

    it('should remove inventory item', () => {
        const actual = inventoryReducer(INVENTORY_STATE, removeInventoryItem({ id: ITEM.id }));
        const expected: InventoryItemState = {
            ids: [],
            entities: {}
        };
        expect(actual).toEqual(expected);
    });

    it('should update inventory item', () => {
        const actual = inventoryReducer(INVENTORY_STATE, updateInventoryItem({ update: {
            id: 1,
            changes: {
                name: "New Name",
                amount: 123
            }
        }}));
        const expected: InventoryItemState = {
            ...INVENTORY_STATE,
            entities: {
                1: {
                    ...ITEM,
                    name: "New Name",
                    amount: 123
                }
            }
        }
        expect(actual).toEqual(expected);
    });
});