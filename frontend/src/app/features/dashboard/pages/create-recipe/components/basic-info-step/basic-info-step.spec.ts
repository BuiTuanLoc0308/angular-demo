import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoStep } from './basic-info-step';

describe('BasicInfoStep', () => {
  let component: BasicInfoStep;
  let fixture: ComponentFixture<BasicInfoStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInfoStep],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicInfoStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
