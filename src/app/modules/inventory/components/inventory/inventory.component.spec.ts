import { expect, jest } from '@jest/globals';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { InventoryComponent } from './inventory.component';
import { InventoryModule } from '../../inventory.module';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { InventoryItemState } from '../../store/inventory.reducers';
import { OUT_OF_STOCK } from '../../const';
import { addInventoryItem, removeInventoryItem, updateInventoryItem } from '../../store/inventory.actions';
import { MOCK_INVENTORY_STATE } from '../../mocks/test.mock';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let store: MockStore<{ inventoryItems: InventoryItemState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryComponent],
      imports: [
        InventoryModule
      ],
      providers: [
        provideMockStore({
          initialState: MOCK_INVENTORY_STATE
        })
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('empty state', () => {
    beforeEach(() => {
      const inventoryItems: DebugElement = fixture.debugElement.query(By.css('[data-test-id="inventory-items"]'));
      expect(inventoryItems).toBeTruthy();

      store.setState({
        inventoryItems: {
          ids: [],
          entities: {}
        }
      });
      fixture.detectChanges();
    });

    it('should hide the inventory when the inventory list is empty', () => {
      const inventoryItems = fixture.debugElement.query(By.css('[data-test-id="inventory-items"]'));
      expect(inventoryItems).toBeFalsy();
    });

    it('should display the empty state page when the inventory list is empty', () => {
      const emptyInventory = fixture.debugElement.query(By.css('[data-test-id="empty-inventory"]'));
      expect(emptyInventory).toBeTruthy();
    });
  });

  describe('inventory item actions', () => {
    it('should increment amount of the item', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      const btn = fixture.debugElement.query(By.css('[data-test-id="increment-btn-1"]'));
      btn.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: updateInventoryItem.type,
        update: expect.objectContaining({
          id: 1,
          changes: expect.objectContaining({
            amount: 2
          })
        })
      });
    });

    it('should decrement amount of the item when the amount is greater than 0', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      const btn = fixture.debugElement.query(By.css('[data-test-id="decrement-btn-2"]'));
      btn.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: updateInventoryItem.type,
        update: expect.objectContaining({
          id: 2,
          changes: expect.objectContaining({
            amount: 4
          })
        })
      });
    });

    it('should not decrement amount of the item when the amount is less than 1', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      const btn = fixture.debugElement.query(By.css('[data-test-id="decrement-btn-3"]'));
      btn.nativeElement.click();

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('should mark out of stock when the amount is less than 1', () => {
      const amountContent = fixture.debugElement.query(By.css('[data-test-id="amount-3"]')).nativeElement.textContent.trim();
      expect(amountContent).toEqual(OUT_OF_STOCK);
    });

    it('should remove the inventory item', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      const btn = fixture.debugElement.query(By.css('[data-test-id="remove-btn-1"]'));
      btn.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: removeInventoryItem.type,
        id: 1
      }));
    });

    it('should add new inventory item', fakeAsync(() => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.newItem.setValue({
        id: 0,
        name: 'New Item',
        amount: 8,
        createdAt: new Date(),
        lastUpdatedAt: new Date()
      });

      tick(500);

      const btn = fixture.debugElement.query(By.css('[data-test-id="add-btn"]'));
      btn.nativeElement.click();

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: addInventoryItem.type,
        inventoryItem: expect.objectContaining({
          name: 'New Item',
          amount: 8
        })
      });
    }));

    it('should not add new inventory item when amount is less than 1', fakeAsync(() => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.newItem.setValue({
        id: 0,
        name: 'New Item',
        amount: 0,
        createdAt: new Date(),
        lastUpdatedAt: new Date()
      });

      tick(500);

      const btn = fixture.debugElement.query(By.css('[data-test-id="add-btn"]'));
      btn.nativeElement.click();

      expect(dispatchSpy).not.toHaveBeenCalled();
    }));

    it('should not add new inventory item when name is empty', fakeAsync(() => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      component.newItem.setValue({
        id: 0,
        name: '',
        amount: 6,
        createdAt: new Date(),
        lastUpdatedAt: new Date()
      });

      tick(500);

      const btn = fixture.debugElement.query(By.css('[data-test-id="add-btn"]'));
      btn.nativeElement.click();

      expect(dispatchSpy).not.toHaveBeenCalled();
    }));
  });
});
