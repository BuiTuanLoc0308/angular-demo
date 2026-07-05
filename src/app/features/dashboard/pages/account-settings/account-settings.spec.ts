import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettings } from './account-settings';

describe('AccountSettings', () => {
  let component: AccountSettings;
  let fixture: ComponentFixture<AccountSettings>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [AccountSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode and persist the preference', () => {
    component.ngOnInit();

    component.toggleDarkMode();

    expect(component.isDarkMode).toBe(true);
    expect(localStorage.getItem('account-settings-theme')).toBe('dark');
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });
});
