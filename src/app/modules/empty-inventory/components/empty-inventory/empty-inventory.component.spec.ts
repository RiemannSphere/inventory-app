import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { EmptyInventoryComponent } from './empty-inventory.component';
import { EmptyInventoryModule } from '../../empty-inventory.module'

describe('EmptyInventoryComponent', () => {
  let component: EmptyInventoryComponent;
  let fixture: ComponentFixture<EmptyInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyInventoryComponent],
      imports: [
        EmptyInventoryModule
      ],
      providers: [
        provideMockStore({})
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmptyInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
