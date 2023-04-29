import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyInventoryComponent } from './empty-inventory.component';

describe('EmptyInventoryComponent', () => {
  let component: EmptyInventoryComponent;
  let fixture: ComponentFixture<EmptyInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyInventoryComponent ]
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
