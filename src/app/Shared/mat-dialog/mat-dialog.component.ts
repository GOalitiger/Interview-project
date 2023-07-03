import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css']
})
export class MatDialogComponent implements OnInit {


  form:FormGroup
  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder) {}
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.InitForm();
  }
  InitForm()
  {
    this.form = this.formbuilder.group({
      body:['',[Validators.required, Validators.minLength(10)]],
 
    })

    if(this.data.form =='update')
    {
      this.form.get('body').setValue(this.data.body);
    }
    
  }
  
  getErrorMessage(controlName) {

    if (this.form.get(controlName).hasError('required')) {
      return 'Enter a value';
    }
    if (this.form.get(controlName).hasError('minlength')) {
      return 'Enter at least 10 characters'
    }
}

}
