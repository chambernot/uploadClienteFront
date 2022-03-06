import { Component,Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClienteElement } from 'src/app/models/ClienteElement';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
element!: ClienteElement;
isChange!:boolean;
public clienteFormGroup!: FormGroup;

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
    

    this.clienteFormGroup = new FormGroup({
      nome : new FormControl('nome', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      sobreNome : new FormControl ('sobreNome', [Validators.required, Validators.maxLength(200)]),
      nacionalidade : new FormControl ('nacionalidade', [Validators.required, Validators.maxLength(20)]),
      cep : new FormControl ('cep', [Validators.required, Validators.maxLength(8)]),
      estado : new FormControl ('estado', [Validators.required, Validators.maxLength(2)]),
      cidade : new FormControl ('cidade', [Validators.required, Validators.maxLength(100)]),
      logradouro : new FormControl ('logradouro', [Validators.required, Validators.maxLength(200)]),
      email : new FormControl ('email', [Validators.required, Validators.maxLength(200)]),
      telefone : new FormControl ('telefone', [Validators.required, Validators.maxLength(30)])

    });

    console.log(this.clienteFormGroup.valid)
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.clienteFormGroup.controls[controlName].hasError(errorName);
  }


  onCancel(): void {
    this.dialogRef.close();


  }

}
