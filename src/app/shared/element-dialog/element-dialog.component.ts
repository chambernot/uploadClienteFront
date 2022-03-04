import { Component,Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClienteElement } from 'src/app/models/ClienteElement';



@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
element!: ClienteElement;
isChange!:boolean;

getFormGroupClass(isValid : boolean, isPristine: boolean) : {} {
  return {
      'form-group' : true,
      'has-danger': !isValid && !isPristine,
      'has-success': isValid && !isPristine
  };
}

getFormControlClass(isValid : boolean, isPristine: boolean) : {} {
  return {
      'form-control' : true,
      'has-danger': !isValid && !isPristine,
      'has-success': isValid && !isPristine
  };
}


constructor(
  @Inject(MAT_DIALOG_DATA) 
  public data: ClienteElement,
  public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void {
    if(this.data.id != "")
    {
      this.isChange = true;
    }else{
      this.isChange = false;

    }
  }
  onCancel(): void {
    this.dialogRef.close();


  }

}
