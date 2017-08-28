import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdProgressSpinnerModule
} from '@angular/material';
const modules = [
  MdButtonModule,
  MdCheckboxModule,
  MdProgressSpinnerModule
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
