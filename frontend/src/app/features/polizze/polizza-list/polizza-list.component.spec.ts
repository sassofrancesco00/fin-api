import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizzaListComponent } from './polizza-list.component';

describe('PolizzaListComponent', () => {
  let component: PolizzaListComponent;
  let fixture: ComponentFixture<PolizzaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolizzaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolizzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
