/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HastalarComponent } from './hastalar.component';

describe('HastalarComponent', () => {
  let component: HastalarComponent;
  let fixture: ComponentFixture<HastalarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HastalarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HastalarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
