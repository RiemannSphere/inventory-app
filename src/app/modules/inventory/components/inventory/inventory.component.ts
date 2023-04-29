import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INVENTORY_ITEMS } from '../../mocks/inventory.mock';
import { InventoryItem } from '../../store/inventory.model';
import { Store } from '@ngrx/store';
import { InventoryItemState } from '../../store/inventory.reducers';
import { Observable } from 'rxjs';
import { selectInventoryItemsArray } from '../../store/inventory.selectors';
import { addInventoryItem, loadInventoryItems, removeInventoryItem, updateInventoryItem } from '../../store/inventory.actions';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {
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

  onItemAddOne(item: InventoryItem): void {
    this.store.dispatch(updateInventoryItem({
      id: item.id,
      changes: {
        amount: item.amount + 1,
        lastUpdatedAt: new Date()
      }
    }));
  }

  onItemRemoveOne(item: InventoryItem): void {
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

  onItemRemoveAll(item: InventoryItem): void {
    this.store.dispatch(removeInventoryItem({ id: item.id }));
  }

  onItemAddNew(item: InventoryItem): void {
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
