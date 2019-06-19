import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MateriaModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MateriaModule],
  exports: [MateriaModule],
})
export class SharedModule {}
