/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TahlilsonucFotoDialogComponent } from './tahlilsonucFoto-dialog.component';

describe('TahlilsonucFotoDialogComponent', () => {
  let component: TahlilsonucFotoDialogComponent;
  let fixture: ComponentFixture<TahlilsonucFotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TahlilsonucFotoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TahlilsonucFotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
