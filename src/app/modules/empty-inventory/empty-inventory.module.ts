import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyInventoryComponent } from './components/empty-inventory/empty-inventory.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    EmptyInventoryComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    EmptyInventoryComponent
  ]
})
export class EmptyInventoryModule { }
