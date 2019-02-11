import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPeopleComponent } from './list-people/list-people.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatCheckboxModule, MatTooltipModule, MatIconModule, MatMenuModule, MatSnackBarModule } from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { DemoServices } from './services/global.service';
import { AddPeopleComponent } from './add-people/add-people.component';
import { ControlePeopleComponent } from './controle-people/controle-people.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SnackbarCustomComponent } from './snackbar-custom/snackbar-custom.component';


@NgModule({
  declarations: [
    AppComponent,
    ListPeopleComponent,
    AddPeopleComponent,
    ControlePeopleComponent,
    SnackbarCustomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule

  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [DemoServices],
  bootstrap: [AppComponent],
  entryComponents:[
    SnackbarCustomComponent
  ]
})
export class AppModule { }
