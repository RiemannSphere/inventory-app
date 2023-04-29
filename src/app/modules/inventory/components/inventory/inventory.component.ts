import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InventoryItem } from '../../store/inventory.model';
import { INVENTORY_ITEMS } from '../../mocks/inventory.mock';
import { InventoryItemState } from '../../store/inventory.reducers';
import { addInventoryItem, loadInventoryItems, removeInventoryItem, updateInventoryItem } from '../../store/inventory.actions';
import { selectInventoryItemsArray } from '../../store/inventory.selectors';
import { OUT_OF_STOCK } from '../../const';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {
  OUT_OF_STOCK = OUT_OF_STOCK;
  displayedColumns: string[] = ['name', 'amount', 'createdAt', 'lastUpdatedAt', 'actions'];
  dataSource: InventoryItem[] = INVENTORY_ITEMS;
  newItem: FormGroup;

  inventoryItems$: Observable<InventoryItem[]>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<InventoryItemState>
  ) {
    this.newItem = this.fb.group<InventoryItem>({
      id: 0,
      name: '',
      amount: 0,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    });

    this.store.dispatch(loadInventoryItems());
    this.inventoryItems$ = this.store.select(selectInventoryItemsArray);
  }

  onIncrementAmount(item: InventoryItem): void {
    this.store.dispatch(updateInventoryItem({
      id: item.id,
      changes: {
        amount: item.amount + 1,
        lastUpdatedAt: new Date()
      }
    }));
  }

  onDecrementAmount(item: InventoryItem): void {
    if (item.amount > 0) {
      this.store.dispatch(updateInventoryItem({
        id: item.id,
        changes: {
          amount: item.amount - 1,
          lastUpdatedAt: new Date()
        }
      }));
    }
  }

  onRemoveItem(item: InventoryItem): void {
    this.store.dispatch(removeInventoryItem({ id: item.id }));
  }

  onAddNewItem(item: InventoryItem): void {
    if (item.amount < 1) {
      alert('Add at least 1 item!');
      return;
    }

    if (!item.name) {
      alert('Name your item!');
      return;
    }

    const date = new Date();
    this.store.dispatch(addInventoryItem({
      ...item,
      createdAt: date,
      lastUpdatedAt: date
    }));

    this.newItem.reset();
  }
}
