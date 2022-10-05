import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface SignUpData {
  id: number;
  name: string;
  telephone: string;  
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  frmCadastro:UntypedFormGroup = new UntypedFormGroup({})
  displayedColumns: string[] = ['id', 'name', 'telephone'];
  dataSource: MatTableDataSource<SignUpData>;
  users: SignUpData[] = [
    {
      id:1,
      name: "Anderson",
      telephone: "1221001147"
    },
    {
      id:2,
      name: "Bruno",
      telephone: "1221001148"
    }
  ];
  checkForError:boolean = true;
  
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  
  constructor( 
    private builder:UntypedFormBuilder) {      
      this.dataSource = new MatTableDataSource(this.users);
     }

  ngOnInit(): void {
    this.frmCadastro = this.builder.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]]
    })
    
  }

  onClickSave(){

    this.checkForError = checkForError(this.frmCadastro)    

    if(this.checkForError !== true){
      let result = this.users.map(id => id.id)
      const latestId = Math.max(...result);

      this.users.push({
        id: latestId+1,
        name: this.frmCadastro.controls['name'].value,
        telephone: this.frmCadastro.controls['telephone'].value
      })

      this.dataSource = new MatTableDataSource(this.users)
      this.frmCadastro.reset();   
    }else{
      alert("Necessário corrigir os erros.")
    }    

  }

  onClickClear(){
    this.frmCadastro.reset();
  }

  getErrorMessage(){
    if (this.frmCadastro.hasError('required')) {
      return 'Digite um valor';
    }
    return this.frmCadastro.hasError('pattern') ? 'Valor inválido' : '';
  }

  ngAfterViewInit() {    
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

function checkForError(frm:UntypedFormGroup){ 
  
  let error;
  
  if(frm.controls['name'].hasError('required') || frm.controls['telephone'].hasError('required') ){
    return error = true;
  } else {
    return error = false;
  }
}
