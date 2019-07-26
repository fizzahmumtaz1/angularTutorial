import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import { map } from 'rxjs/operators';
//import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource, MatButton, MatDialog } from '@angular/material';
import { WebService } from '../../services/webservice.service';
import { Contacts } from '../../models/contacts.model';
import { HttpClient } from '@angular/common/http';
import { AddDialogComponent } from '../../dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from '../../dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from '../../dialogs/edit/edit.dialog.component';
import { Observable, of as observableOf, merge } from 'rxjs';
import { AuthService } from '../../core/auth.service';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contactService: WebService | null;
  dataSource: ContactDataSource;
  data: Contacts[];
  index: number;
  id: number;
  showSpinner: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['id', 'first_name', 'last_name', 'email', 'actions'];

  //dataSource = new UserDataSource(this.webService);
  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: WebService, public authService: AuthService, 
    private location: Location, private router: Router) {

  }

  ngOnInit() {
    this.refreshTable();
    
  }

  refresh() {
    this.showSpinner = true;
    setTimeout(() => {
      this.refreshTable();
      this.showSpinner = false;
    }, 2000);
  }

  addNew(contact: Contacts) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { contact: contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showSpinner = true;

        setTimeout(() => {
          this.contactService.dataChange.value.push(this.dataService.getDialogData());
          this.showSpinner = false;
        }, 2000);
        //this.refreshTable();
        this.refreshTable();
      }
    });
  }


  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
        // this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  startEdit(i: number, id: number, first_name: string, last_name: string, email: string) {
    this.id = id;
    this.index = i;
    console.log(this.index);

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { id: id, first_name: first_name, last_name: last_name, email: email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showSpinner = true;

        setTimeout(() => {
          const foundIndex = this.contactService.dataChange.value.findIndex(x => x.id === this.id);
          this.contactService.dataChange.value[foundIndex] = this.dataService.getDialogData();
          this.showSpinner = false;
        }, 2000);
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, first_name: string, last_name: string, email: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: id, first_name: first_name, last_name: last_name, email: email }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.showSpinner = true;

        setTimeout(() => {
          const foundIndex = this.contactService.dataChange.value.findIndex(x => x.id === this.id);
          this.contactService.dataChange.value.splice(foundIndex, 1);
          this.showSpinner = false;
        }, 2000);
        //this.refreshTable();
        this.refreshTable();
      }
    });

  }

  private refreshTable() {
    this.contactService = new WebService(this.httpClient);
    this.contactService.getContact().subscribe((
      c: Contacts[]) => {
      this.data = c;
      this.dataSource = this.getDataSource();
    }
    );
  }

  private getDataSource() {
    let dataSource: ContactDataSource = new ContactDataSource(this.data, this.paginator, this.sort);
    return dataSource;
  }
}

export class ContactDataSource extends DataSource<Contacts> {

  data: Contacts[] = [];
  constructor(public dataa: Contacts[],
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();



    // Reset to the first page when the user changes the filter.
   this.data = dataa;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Contacts[]> {

   // return this._contactDatabase.getContact();
  

    const dataMutations = [
      observableOf(this.data),
      this._paginator.page,
      this._sort.sortChange
    ];
    this._paginator.length = this.data.length;
  
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(
        this.getSortedData([...this.data]));
    }));
    
  }

  disconnect() {
  }

  private getPagedData(data: Contacts[]) {
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.splice(startIndex, this._paginator.pageSize);
  }

  private getSortedData(data: Contacts[]) {
     if (!this._sort.active || this._sort.direction === '') {
       return data;
     }
    console.log(data);
    return data.sort((a, b) => {
      const isAsc = this._sort.direction === 'asc';
      switch (this._sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'first_name': return compare(+a.first_name, +b.first_name, isAsc);
        case 'last_name': return compare(+a.last_name, +b.last_name, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);

        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



