import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BoardComponent } from "./board/board.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./notfound/notfound.component";

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "board", component: BoardComponent },
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
