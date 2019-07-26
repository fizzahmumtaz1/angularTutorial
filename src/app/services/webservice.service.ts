import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse }   from '@angular/common/http';
import { Observable, BehaviorSubject }   from 'rxjs';
//import 'rxjs/add/operator/map';
import { Contacts } from '../models/contacts.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private readonly serviceUrl = 'http://localhost:3000/employees';
  dataChange: BehaviorSubject<Contacts[]> = new BehaviorSubject<Contacts[]>([]);

  dialogData: any;
  constructor (private httpClient: HttpClient) {}

  get data(): Contacts[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getContacts():void {
     this.httpClient.get<Contacts[]>(environment.serviceUrl).subscribe(data=>{
     this.dataChange.next(data);
  },
  (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
    }


    getContact(): Observable<Contacts[]> {
      return this.httpClient.get<Contacts[]>(environment.serviceUrl)
        // .pipe(
        //   map((response: any) => {
        //     return <Array<Contacts>>response;
        //   }),
        //   catchError(err => { throw err })
        // );
    }
    // getContact(): Observable<Contacts[]> {
    //   return this.httpClient.get<Contacts[]>(this.serviceUrl);
    // }


addItem(contact: Contacts): void {
  this.httpClient.post(environment.serviceUrl, contact).subscribe(data => {
    this.dialogData = contact;
    console.log('Successfully added');
   // this.toasterService.showToaster('Successfully added', 3000);
    },
    (err: HttpErrorResponse) => {
      console.log('Error Occured');
    //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
  });
 }

 updateItem(contact: Contacts): void {
  this.httpClient.put(environment.serviceUrl + '/'+ contact.id, contact).subscribe(data => {
      this.dialogData = contact;
      console.log('successfully edited')
    },
    (err: HttpErrorResponse) => {
      console.log('Error Occured')
    }
  );
}


deleteItem(id: number): void {
  this.httpClient.delete(environment.serviceUrl + '/'+ id).subscribe(data => {
    console.log(data['']);
    console.log('successfully deleted')
    },
    (err: HttpErrorResponse) => {
      console.log('Error Occured')
    }
  );
}

}


