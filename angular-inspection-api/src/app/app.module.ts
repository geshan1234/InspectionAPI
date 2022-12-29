import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InspectionComponent } from './inspection/inspection.component';
import { InspectionApiService } from './services/inspection-api.service';
import { AddEditInspectionComponent } from './inspection/add-edit-inspection/add-edit-inspection.component';
import { ShowInspectionComponent } from './inspection/show-inspection/show-inspection.component';
import { DeleteInspectionComponent } from './inspection/delete-inspection/delete-inspection.component';

@NgModule({
  declarations: [
    AppComponent,
    InspectionComponent,
    AddEditInspectionComponent,
    ShowInspectionComponent,
    DeleteInspectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [InspectionApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
