import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestaFormComponent } from './richiesta-form.component';

describe('RichiestaFormComponent', () => {
  let component: RichiestaFormComponent;
  let fixture: ComponentFixture<RichiestaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichiestaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichiestaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
