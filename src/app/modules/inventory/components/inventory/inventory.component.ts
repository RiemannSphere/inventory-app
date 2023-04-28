import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryItem } from '../../interfaces/inventory.interface';
import { INVENTORY_ITEMS } from '../../mocks/inventory.mock';

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
  
  constructor(private fb: FormBuilder){
    this.newItem = this.fb.group<InventoryItem>({
      id: 0,
      name: '',
      amount: 0,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    });
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
