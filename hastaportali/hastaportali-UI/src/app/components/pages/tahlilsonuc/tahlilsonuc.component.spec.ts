/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TahlilsonucComponent } from './tahlilsonuc.component';

describe('TahlilsonucComponent', () => {
  let component: TahlilsonucComponent;
  let fixture: ComponentFixture<TahlilsonucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahlilsonucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahlilsonucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
