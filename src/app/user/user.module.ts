import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UserComponent, RegisterComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [UserComponent],
})
export class UserModule {}
