import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcongedialogComponent } from './addcongedialog.component';

describe('AddcongedialogComponent', () => {
  let component: AddcongedialogComponent;
  let fixture: ComponentFixture<AddcongedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcongedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcongedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
