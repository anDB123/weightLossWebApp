import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TargetInputComponent } from './target-input/target-input.component';
import { DataTableComponent } from './data-table/data-table.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { UpdateChartService } from './update-chart.service';



@NgModule({
  declarations: [
    AppComponent,
    AddEntryComponent,
    UserProfileComponent,
    TargetInputComponent,
    DataTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    AuthModule.forRoot({
      domain: 'dev-brirxn87533hamdn.us.auth0.com',
      clientId: 'CMff3OK0AHUXvItZPrSC5SFJoNXaz2Qb',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    MatRadioModule,
    MatTableModule,
  ],
  providers: [UpdateChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
