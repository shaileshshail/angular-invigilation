import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { EventsComponent } from "./events/events.component";
import { FulleventComponent } from "./fullevent/fullevent.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes:Routes =[
  { path: '', component: LoginComponent },
  { path: 'events', component: EventsComponent,canActivate:[AuthGuard] },
  { path: 'edit/:id', component: FulleventComponent,canActivate:[AuthGuard] },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule],
})
export class AppRoutingModule{

}
