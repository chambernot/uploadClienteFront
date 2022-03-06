import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { ClienteElement } from 'src/app/models/ClienteElement';
import { ClienteService } from 'src/app/services/cliente.service';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers:[ClienteService]
  
})
export class ClienteComponent implements OnInit {
  @ViewChild(MatTable)
  table!:MatTable<any>
  displayedColumns: string[] = ['nome', 'sobrenome', 'nacionalidade', 'cep','action'];
  dataSource! : ClienteElement[];
  
  periodicElement = {} as ClienteElement;
  cli! : ClienteElement[];
  constructor(public dialog: MatDialog, 
              public periodicElementService:ClienteService
    ) 
    {
      
            
      this.periodicElementService.getCliente()
      .subscribe((data:ClienteElement[])=>{
        this.dataSource=data;
        console.log(data)
      });

      
    }
    
    
  ngOnInit(): void {
    
  }

  openDialog(element:ClienteElement | null): void {

    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element===null?{
        id:'',
        nome:'',
        sobreNome:'',
        nacionalidade:'',
        cep:'',
        estado:'',
        cidade:'',
        logradouro:'',
        email:'',
        telefone:'',
        cpf:''

      }:{
        id:element.id,
        nome:element.nome,
        sobreNome:element.sobreNome,
        nacionalidade:element.nacionalidade,
        cep:element.cep,
        estado:element.estado,
        cidade:element.cidade,
        logradouro:element.logradouro,
        email:element.email,
        telefone:element.telefone,
        cpf:element.cpf

      }
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined)
    {
      console.log(result);
      if(this.dataSource.map(p=>p.id).includes(result.id))
      {
          this.periodicElementService.alterCliente(result)
          .subscribe((data: ClienteElement)=>{
console.log(data);
           this.dataSource[result.id - 1]= data;
           this.table.renderRows();

          });
          

      }else
      {
        this.periodicElementService.createCliente(result)

        .subscribe((data: ClienteElement) =>
        {
          if  (data.id !=undefined){

            this.dataSource.push(data);
            this.table.renderRows();
      
          }else {
            console.log("cpf já existe na base");

          }
          
        });
        
      }
      

    }  
    });
  }

  deleteelement(cliente: ClienteElement): void{
      this.periodicElementService.delteCliente(cliente.id)
      .subscribe(()=> {
        this.dataSource = this.dataSource.filter(p=> p.id !== cliente.id)
      }
      );
      
      
  }

  editelement(element: ClienteElement): void{

    this.openDialog(element);
    
}

  

}
