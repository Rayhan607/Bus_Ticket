import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { AppHomeComponent } from './components/home/app-home/app-home.component';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { CompanyService } from './services/data/company.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotifyService } from './services/common/notify.service';
import { BusService } from './services/data/bus.service';
import { BusViewComponent } from './components/bus/bus-view/bus-view.component';
import { BusCreateComponent } from './components/bus/bus-create/bus-create.component';
import { BusEditComponent } from './components/bus/bus-edit/bus-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusRouteViewComponent } from './components/bus-route-view/bus-route-view.component';
import { BusRouteCreateComponent } from './components/bus-route-create/bus-route-create.component';
import { BusRouteEditComponent } from './components/bus-route-edit/bus-route-edit.component';
import { BusRouteService } from './services/data/bus-route.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ScheduleService } from './services/data/schedule.service';
import { DatePipe } from '@angular/common';
import { ScheduleViewComponent } from './components/schedule/schedule-view/schedule-view.component';
import { ScheduleCreateComponent } from './components/schedule/schedule-create/schedule-create.component';
import { ScheduleEditComponent } from './components/schedule/schedule-edit/schedule-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AppHomeComponent,
    BusViewComponent,
    BusCreateComponent,
    BusEditComponent,
    BusRouteViewComponent,
    BusRouteCreateComponent,
    BusRouteEditComponent,
    ConfirmDialogComponent,
    ScheduleViewComponent,
    ScheduleCreateComponent,
    ScheduleEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,
    NgMaterialMultilevelMenuModule,
    MatImportModule
    
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [
    DatePipe,
    HttpClient,
    MultilevelMenuService,
    CompanyService,
    NotifyService,
    BusService,
    BusRouteService,
    ScheduleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
