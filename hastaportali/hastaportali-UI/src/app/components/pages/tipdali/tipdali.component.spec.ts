/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TipdaliComponent } from './tipdali.component';

describe('TipdaliComponent', () => {
  let component: TipdaliComponent;
  let fixture: ComponentFixture<TipdaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipdaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipdaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
