import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizzaFormComponent } from './polizza-form.component';

describe('PolizzaFormComponent', () => {
  let component: PolizzaFormComponent;
  let fixture: ComponentFixture<PolizzaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolizzaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolizzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
