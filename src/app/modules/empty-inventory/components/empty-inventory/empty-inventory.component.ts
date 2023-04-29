import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addInventoryItem } from 'src/app/modules/inventory/store/inventory.actions';
import { InventoryItem } from 'src/app/modules/inventory/store/inventory.model';
import { InventoryItemState } from 'src/app/modules/inventory/store/inventory.reducers';

@Component({
  selector: 'app-empty-inventory',
  templateUrl: './empty-inventory.component.html',
  styleUrls: ['./empty-inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyInventoryComponent {
  newItem: FormGroup;

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