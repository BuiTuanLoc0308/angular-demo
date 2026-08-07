import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsStep } from './ingredients-step';

describe('IngredientsStep', () => {
  let component: IngredientsStep;
  let fixture: ComponentFixture<IngredientsStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsStep],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
