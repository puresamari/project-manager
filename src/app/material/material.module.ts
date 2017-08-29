import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import * as modules from '@angular/material';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdListModule,
  MdIconModule,
  MdCardModule,
  MdGridListModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
} from '@angular/material';
const modules = [
  MdButtonModule,
  MdCheckboxModule,
  MdListModule,
  MdIconModule,
  MdCardModule,
  MdGridListModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ...modules
  ],
  exports: [
    BrowserAnimationsModule,
    ...modules
  ],
  declarations: []
})
export class MaterialModule { }
