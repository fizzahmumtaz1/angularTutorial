import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCheckboxModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { AppComponent } from './app.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import {MatListModule} from '@angular/material/list';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { WebService } from './services/webservice.service';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import {  MatProgressSpinnerModule, 
   } from "@angular/material";
  import {
    MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
    MatTableModule, MatToolbarModule,MAT_DIALOG_DEFAULT_OPTIONS,
  } from '@angular/material';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
  import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Notfound/not-found/not-found.component';
//import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { AuthGuard } from './core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: NotFoundComponent
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'contactList',
    component: ContactsListComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
  // },
  // {
  //   path: '',
  //   redirectTo:'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    ContactsListComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatInputModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterModule,
    
    RouterModule.forRoot(appRoutes,{ useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    //ui module
   // MaterialModule.forRoot()
    

  ],
  entryComponents: [
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent
  ],
  providers: [
    {
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: { hasBackdrop: false },
    
    },
    AuthService,
    WebService],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class AppModule { }
