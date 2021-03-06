import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  {
    path: 'lE7utiq3QzLDNhp6whJqbi6MKZQo0Nzq4t85cUho',
    component: AdminComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
