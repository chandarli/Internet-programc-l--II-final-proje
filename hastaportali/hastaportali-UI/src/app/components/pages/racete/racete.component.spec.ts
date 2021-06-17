/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RaceteComponent } from './racete.component';

describe('RaceteComponent', () => {
  let component: RaceteComponent;
  let fixture: ComponentFixture<RaceteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
