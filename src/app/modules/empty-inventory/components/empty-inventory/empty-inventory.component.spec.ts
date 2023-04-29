import { expect, jest } from '@jest/globals';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EmptyInventoryComponent } from './empty-inventory.component';
import { EmptyInventoryModule } from '../../empty-inventory.module'
import { By } from '@angular/platform-browser';
import { MOCK_INVENTORY_STATE } from '@app/modules/inventory/mocks/test.mock';
import { InventoryItemState } from '@app/modules/inventory/store/inventory.reducers';
import { addInventoryItem } from '@app/modules/inventory/store/inventory.actions';

describe('EmptyInventoryComponent', () => {
  let component: EmptyInventoryComponent;
  let fixture: ComponentFixture<EmptyInventoryComponent>;
  let store: MockStore<{ inventoryItems: InventoryItemState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyInventoryComponent],
      imports: [
        EmptyInventoryModule
      ],
      providers: [
        provideMockStore({
          initialState: MOCK_INVENTORY_STATE
        })
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(EmptyInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inventory item actions', () => {
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

      const btn = fixture.debugElement.query(By.css('[data-test-id="ei-add-btn"]'));
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

      const btn = fixture.debugElement.query(By.css('[data-test-id="ei-add-btn"]'));
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

      const btn = fixture.debugElement.query(By.css('[data-test-id="ei-add-btn"]'));
      btn.nativeElement.click();

      expect(dispatchSpy).not.toHaveBeenCalled();
    }));
  });
});
