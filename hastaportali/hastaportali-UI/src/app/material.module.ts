import { NgModule } from '@angular/core';
import {MatButtonModule} from'@angular/material/button';
import {MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule } from '@angular/material/toolbar';

import{MatSidenavModule} from '@angular/material/sidenav'
import{MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';
import{MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table'

import {MatSortModule} from'@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';



const MatModuller = [

  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatDividerModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatTooltipModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule,
  ReactiveFormsModule

];

@NgModule({
  imports: [MatModuller],
  exports: [MatModuller],
})
export class materialmodule { }
