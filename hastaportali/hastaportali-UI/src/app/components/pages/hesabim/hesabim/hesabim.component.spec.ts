/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HesabimComponent } from './hesabim.component';

describe('HesabimComponent', () => {
  let component: HesabimComponent;
  let fixture: ComponentFixture<HesabimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesabimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesabimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
