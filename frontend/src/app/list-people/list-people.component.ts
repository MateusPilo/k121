import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DemoServices } from '../services/global.service';
import { ComponentsService } from '../services/components.service';
import { SnackBarService } from '../snackbar-custom/snack-info.service';

@Component({
  selector: 'list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements OnInit {

  displayedColumns: any = [
		'nome',
		'email',
		'actions'
  ];
  
  component = "people";
	dataSource = new MatTableDataSource<any>();
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);
	resultsLength: number = 0;

  subscription: Subscription;
	searchForm: FormGroup;
  cntdSearch: string;
  
  @Input() screen: any;

	formErrors: any = {
		'search': '',
	};
	validationMessages: any;

	loadingResults: boolean = false;
  
  constructor(private service: DemoServices,
              private componentService: ComponentsService,
              private mySnackBar: SnackBarService) { 
                this.subscription = this.componentService.getMessage().subscribe(message => {
                  this.screen = message;
                });
              }

  ngOnInit() {
    this.load();
   
  }

	load(search?: string) {
    this.service.getObjects(this.component).subscribe((data:any) => {
      this.dataSource.data = data.dados
      console.log(data);
    },err => console.log(err),
    () => {
      console.log('done load friends')
    });
  }
  
  newFriend() {
		this.screen.inEdit = '';
		this.screen.propertie = 'cad';
		this.componentService.sendMessage(this.screen);
		
  }
  
  edit(row) {
    console.log(row._id);
		this.screen.inEdit = row._id;
		this.screen.propertie = 'cad';
		this.componentService.sendMessage(this.screen);
		
  }
  
  remove(row){
    this.service.deleteObject(this.component,row._id)
    .subscribe((response:any) => {
      this.mySnackBar.setMessage("Amigo apagado com sucesso !","Sucesso","success");
      this.load();
    },err => {
      this.mySnackBar.setMessage("Não foi possivel remover um amigo :(","Falha","error");
    });
  }

  drawFriends(){
    if(this.dataSource.data.length > 1){
      this.service.postObjects('sortear',undefined).subscribe((res:any) => {
        this.mySnackBar.setMessage("Os amigos secretos foram enviados por e-mail :)","Sucesso","success");
      },
      err => {
        this.mySnackBar.setMessage("Falha ao sortear os amigo :(","Falha","error");
      })

      
    }else{
      this.mySnackBar.setMessage("Informe ao menos dois amigos :(","Atenção","error");
    }
  }
}
