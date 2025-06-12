import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestaListComponent } from './richiesta-list.component';

describe('RichiestaListComponent', () => {
  let component: RichiestaListComponent;
  let fixture: ComponentFixture<RichiestaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichiestaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichiestaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
