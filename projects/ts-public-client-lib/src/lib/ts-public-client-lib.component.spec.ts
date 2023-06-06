import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsPublicClientLibComponent } from './ts-public-client-lib.component';

describe('TsPublicClientLibComponent', () => {
  let component: TsPublicClientLibComponent;
  let fixture: ComponentFixture<TsPublicClientLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TsPublicClientLibComponent]
    });
    fixture = TestBed.createComponent(TsPublicClientLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
