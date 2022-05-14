import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusRouteCreateComponent } from './components/bus-route-create/bus-route-create.component';
import { BusRouteEditComponent } from './components/bus-route-edit/bus-route-edit.component';
import { BusRouteViewComponent } from './components/bus-route-view/bus-route-view.component';
import { BusCreateComponent } from './components/bus/bus-create/bus-create.component';
import { BusEditComponent } from './components/bus/bus-edit/bus-edit.component';
import { BusViewComponent } from './components/bus/bus-view/bus-view.component';
import { AppHomeComponent } from './components/home/app-home/app-home.component';
import { ScheduleCreateComponent } from './components/schedule/schedule-create/schedule-create.component';
import { ScheduleEditComponent } from './components/schedule/schedule-edit/schedule-edit.component';
import { ScheduleViewComponent } from './components/schedule/schedule-view/schedule-view.component';

const routes: Routes = [
  {path:'', component:AppHomeComponent},
  {path:'home', component:AppHomeComponent},
  {path: 'buses', component:BusViewComponent},
  {path: 'bus-create', component:BusCreateComponent},
  {path: 'bus-edit/:id', component:BusEditComponent},
  {path: 'bus-routes', component:BusRouteViewComponent},
  {path: 'bus-route-create', component:BusRouteCreateComponent},
  {path: 'bus-route-edit/:id', component:BusRouteEditComponent},
  {path: 'schedules', component:ScheduleViewComponent},
  {path: 'schedule-create', component:ScheduleCreateComponent},
  {path: 'schedule-edit/:id', component:ScheduleEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
