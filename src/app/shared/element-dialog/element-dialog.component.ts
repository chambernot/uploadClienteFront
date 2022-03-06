import { Component,Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClienteElement } from 'src/app/models/ClienteElement';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { CepElement } from 'src/app/models/CepElement';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css'],
  providers:[CepService]
})
export class ElementDialogComponent implements OnInit {
element!: ClienteElement;
cep!: CepElement;
isChange!:boolean;
public clienteFormGroup!: FormGroup;


constructor(
  @Inject(MAT_DIALOG_DATA) 
  public data: ClienteElement,
  public dialogRef: MatDialogRef<ElementDialogComponent>,
  public cepService:CepService,
  ) {}

  

  ngOnInit(): void {
    if(this.data.id != "")
    {
      this.isChange = true;
    }else{
      this.isChange = false;

    }


    this.clienteFormGroup = new FormGroup({
      nome : new FormControl('nome', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      sobreNome : new FormControl ('sobreNome', [Validators.required, Validators.maxLength(200)]),
      nacionalidade : new FormControl ('nacionalidade', [Validators.required, Validators.maxLength(20)]),
      cep : new FormControl ('cep', [Validators.required, Validators.maxLength(8)]),
      estado : new FormControl ('estado', [Validators.required, Validators.maxLength(2)]),
      cidade : new FormControl ('cidade', [Validators.required, Validators.maxLength(100)]),
      logradouro : new FormControl ('logradouro', [Validators.required, Validators.maxLength(200)]),
      email : new FormControl ('email', [Validators.required, Validators.maxLength(200)]),
      telefone : new FormControl ('telefone', [Validators.required, Validators.maxLength(30)]),
      cpf : new FormControl ('cpf', [Validators.required, Validators.maxLength(11)])
    });

    console.log(this.clienteFormGroup.valid)
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.clienteFormGroup.controls[controlName].hasError(errorName);
  }

  

  getcep(){

    this.cepService.getCep(this.element.cep).subscribe((cepretorno:CepElement)=>{
      this.data.cep=cepretorno.cep;
      this.data.cidade=cepretorno.localidade;
      this.data.estado = cepretorno.uf;
      this.data.logradouro = cepretorno.logradouro;
      console.log(cepretorno);
    });

    
  }

  onBlurEvent(event: any){

    this.cepService.getCep(event.target.value).subscribe((cepretorno:CepElement)=>{
      this.data.cep=cepretorno.cep;
      this.data.cidade=cepretorno.localidade;
      this.data.estado = cepretorno.uf;
      this.data.logradouro = cepretorno.logradouro;
      
    });
 
 }
 
 
  onCancel(): void {
    this.dialogRef.close();


  }

   isValidCpf() {
     
    return (control: AbstractControl): Validators => {
      console.log(control.value);
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
         return false;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return false;
        } else {
          return { cpfNotValid: true };
        }
     }
   return false;
 };
  }
}
