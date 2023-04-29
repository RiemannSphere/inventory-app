import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { addInventoryItem } from '@app/modules/inventory/store/inventory.actions';
import { InventoryItem } from '@app/modules/inventory/store/inventory.model';
import { InventoryItemState } from '@app/modules/inventory/store/inventory.reducers';
import { Store } from '@ngrx/store';

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
    this.store.dispatch(addInventoryItem({ inventoryItem: {
      ...item,
      createdAt: date,
      lastUpdatedAt: date
    }}));

    this.newItem.reset();
  }
}
