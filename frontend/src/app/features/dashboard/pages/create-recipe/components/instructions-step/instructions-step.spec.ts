import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsStep } from './instructions-step';

describe('InstructionsStep', () => {
  let component: InstructionsStep;
  let fixture: ComponentFixture<InstructionsStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionsStep],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructionsStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
