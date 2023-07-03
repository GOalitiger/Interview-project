import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MatDialogComponent } from '../Shared/mat-dialog/mat-dialog.component';
import { SharedService } from '../Shared/sharedService.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  @Input() callingComponent: string = null;
  @Input() UserId: number;

  total: number;
  pageSize: number
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageIndex: number
  dataSource = new MatTableDataSource();
  filterParam = null
  showButtons = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = [
    'id',
    'userId',
    'createdAt',
    'body',
   

  ];
  queryParam = {
    page: 1,
    size: 10,
    sortOrder: 'desc',
    sortBy: 'createdAt'
  }

  constructor(
    private sharedService: SharedService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
    if (this.callingComponent !== null) {
      this.filterParam = `&userId=${this.UserId}`
    }
    this.getPosts();
  }
  ngOnChanges(changes: SimpleChanges) {

    this.filterParam = `&userId=${changes.UserId.currentValue}`
  }

  getPosts() {
    if (!this.filterParam) {
      this.sharedService.getPosts(this.queryParam ).subscribe(res => {
        this.dataSource.data = res['records'];
        this.total = res['total'];
        this.pageSize = res['size']
      },
        error => {
          this.toastr.error('Data not found');
        });
    }
    else {

      this.sharedService.getPosts(this.queryParam, this.filterParam).subscribe(res => {
        if (res['records'].length == 0) {
          this.toastr.error('No Posts Found ')
        }
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
    this.getPosts();
  }
  sortData(event: Sort) {

    this.queryParam['sortBy'] = event.active;
    this.queryParam['sortOrder'] = event.direction;
    this.getPosts();
  }
  applyFilter(event?: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    if (this.callingComponent == null) {
      this.filterParam = `&contains=${filterValue}`;
    }
    else {
      this.filterParam = `&contains=${filterValue}&userId=${this.UserId}`;
    }

    this.getPosts();
  }

  resetQueryParams() {
    this.queryParam = {
      page: 1,
      size: 10,
      sortOrder: 'desc',
      sortBy: 'createdAt'
    }

  }

  addColumns() {
    this.displayedColumns.push('update');
    this.displayedColumns.push('delete');
  }
  removeColumns() {
    this.displayedColumns.splice(this.displayedColumns.indexOf('update'), 1);
    this.displayedColumns.splice(this.displayedColumns.indexOf('delete'), 1);
  }
  FilterMyPost() {

    this.showButtons = !this.showButtons;
    if (this.showButtons == true) {
      if (this.displayedColumns.indexOf('update') == -1) {
        this.addColumns();
      }
      const userId = this.sharedService.getUserDetailsLocalStorage()['userId'];
      this.filterParam = `&userId=${userId}`;
      this.resetQueryParams();
      this.getPosts();
    }
    else {
      if (this.displayedColumns.indexOf('update') != -1) { this.removeColumns() }
      this.filterParam = null;
      this.resetQueryParams();
      this.getPosts()
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '300px',
      height: '300px',
      data: { form: 'create' }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
     
        this.sharedService.storePost(result).subscribe(res => {
          this.toastr.success('Posted Successfully!')
          this.resetQueryParams()
          this.getPosts();
        },
          error => {
            this.toastr.error(`Posting Failed : ${error.error.message}`);
            console.log(error);
          });
      }
    });
  }


  updatePost(body: string, postId: number) {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '350px',
      height: '350px',
      data: {
        form: 'update',
        body: body
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.sharedService.updatePost(res, postId).subscribe(res => {
          this.toastr.success("Updated successfully!");
          this.getPosts();
        }, error => {
          this.toastr.error('Error in Updation')
        });
      }
    })

  }
  deletePost(postId: number) {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '250x',
      height: '200px',
      data: { form: 'delete' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.sharedService.deletePost(postId).subscribe(res => {
          this.toastr.success("deleted successfully!");
          this.getPosts();
        }, error => {
          this.toastr.error('Error in deletion')
        });
      }
    })
  }

}
