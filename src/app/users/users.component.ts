import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogComponent } from '../Shared/mat-dialog/mat-dialog.component';
import { SharedService } from '../Shared/sharedService.service';
import { UserService } from './users.service';

// export class user{
//   constructor(public name:string, 
//               public email:string, 
//               public id :number , 
//             )
//   {}
// }


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // providers:[UserService]
})
export class UsersComponent implements OnInit {

  total: number;
  pageSize: number
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageIndex: number
  dataSource = new MatTableDataSource();
  filterParam = null
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = [
    'id',
    'name',
    'email',
    'createdAt',
    'details'
  ];
  queryParam = {
    page: 1,
    size: 10,
    sortOrder: 'desc',
    sortBy: 'createdAt'
  }

  constructor(private userService: UserService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private router: Router,
    private Route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '200px',
      height: '200px',
      data: { form: 'user' }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.deleteUser().subscribe(res => {
       
          if (res) {
            this.toastr.success('Deleted Successfully!')
            this.sharedService.deleteTokenUserLocalStorage();
            this.router.navigate(['login']);
          }
        },
          error => {
            this.toastr.error(`Problem in deletion ${error.error.message}`);
            console.log(error);
          });
      }
    });
  }
  getUsers() {
    if (!this.filterParam) {
      this.userService.getUsers(this.queryParam).subscribe(res => {
        this.dataSource.data = res['records'];
        this.total = res['total'];
        this.pageSize = res['size']
      },
        error => {
          this.toastr.error('Data not found');
        });
    }
    else {

      this.userService.getUsers(this.queryParam, this.filterParam).subscribe(res => {
        this.dataSource.data = res['records'];
        this.total = res['total'];
        this.pageSize = res['size']
      },
        error => {
          this.toastr.error('Data not found');
        });

    }
  }
  onPageClick(event: PageEvent) {
    this.queryParam['page'] = event.pageIndex + 1;
    this.queryParam['size'] = event.pageSize;
    this.getUsers();
  }
  sortData(event: Sort) {
    this.queryParam['sortBy'] = event.active;
    this.queryParam['sortOrder'] = event.direction;
    this.getUsers();
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.filterParam = `&name=${filterValue}`;

    this.getUsers();
  }

  resetQueryParams() {
    this.queryParam = {
      page: 1,
      size: 10,
      sortOrder: 'desc',
      sortBy: 'createdAt'
    }

  }

  userDetails(details: any) {
    this.router.navigate([`./user-details/${details['id']}`])
    this.userService.emitUser(details);
    this.userService.setUserDetails(details);

  }


}
