/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HastabilgilerComponent } from './hastabilgiler.component';

describe('HastabilgilerComponent', () => {
  let component: HastabilgilerComponent;
  let fixture: ComponentFixture<HastabilgilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HastabilgilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HastabilgilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
