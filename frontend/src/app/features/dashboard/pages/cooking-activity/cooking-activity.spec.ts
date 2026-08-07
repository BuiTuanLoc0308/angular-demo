import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingActivity } from './cooking-activity';

describe('CookingActivity', () => {
  let component: CookingActivity;
  let fixture: ComponentFixture<CookingActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookingActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(CookingActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
