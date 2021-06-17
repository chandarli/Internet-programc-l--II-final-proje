/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HastabilgilistesiComponent } from './hastabilgilistesi.component';

describe('HastabilgilistesiComponent', () => {
  let component: HastabilgilistesiComponent;
  let fixture: ComponentFixture<HastabilgilistesiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HastabilgilistesiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HastabilgilistesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
