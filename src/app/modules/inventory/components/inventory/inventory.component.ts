import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INVENTORY_ITEMS } from '../../mocks/inventory.mock';
import { InventoryItem } from '../../store/inventory.model';
import { Store } from '@ngrx/store';
import { InventoryItemState } from '../../store/inventory.reducers';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { selectInventoryItems, selectInventoryItemsArray } from '../../store/inventory.selectors';
import { Dictionary } from '@ngrx/entity';
import { loadInventoryItems } from '../../store/inventory.actions';

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
  ){
    this.newItem = this.fb.group<InventoryItem>({
      id: 0,
      name: '',
      amount: 0,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    });

    this.inventoryItems$ = this.store.select(selectInventoryItemsArray);
    this.store.dispatch(loadInventoryItems());
  }

  onItemAddOne(item: InventoryItem): void {
    this.dataSource = this.dataSource.map((i) => {
      if (i.id === item.id) {
        return {
          ...i,
          amount: i.amount + 1,
          lastUpdatedAt: new Date()
        }
      }

      return i;
    });
  }

  onItemRemoveOne(item: InventoryItem): void {
    this.dataSource = this.dataSource.map((i) => {
      if (i.id === item.id && i.amount > 0) {
        return {
          ...i,
          amount: i.amount - 1,
          lastUpdatedAt: new Date()
        }
      }

      return i;
    });
  }

  onItemRemoveAll(item: InventoryItem): void {
    this.dataSource = this.dataSource.filter((i) => i.id !== item.id);
  }

  onItemAddNew(item: InventoryItem): void {
    if (item.amount < 1) {
      alert('Add at least 1 item!');
      return;
    }

    const date = new Date();
    const newDataSource = Object.assign([], this.dataSource);

    newDataSource.push({
      ...item,
      id: this.dataSource[this.dataSource.length - 1].id + 1,
      createdAt: date,
      lastUpdatedAt: date
    });

    this.dataSource = newDataSource;
  }
}
