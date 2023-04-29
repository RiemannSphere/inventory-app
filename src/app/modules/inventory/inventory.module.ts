import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { InventoryComponent } from './components/inventory/inventory.component';
import { EmptyInventoryModule } from '../empty-inventory/empty-inventory.module';

@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    EmptyInventoryModule
  ],
  exports: [
    InventoryComponent
  ]
})
export class InventoryModule { }
