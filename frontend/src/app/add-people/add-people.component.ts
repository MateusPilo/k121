import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ComponentsService } from '../services/components.service';
import { DemoServices } from '../services/global.service';
import { SnackBarService } from '../snackbar-custom/snack-info.service';

@Component({
  selector: 'add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {
  @Input() screen: any;
  
  peopleForm: FormGroup;
  subscription: Subscription;

  formErrors: any = {
    '_id':'',
		'nome': '',
		'email': ''
  };
  validationMessages: any;
  constructor(private formBuild: FormBuilder,
             private componentService: ComponentsService,
             private serviceHttp: DemoServices,
             private mySnackbar: SnackBarService) { 
              this.subscription = this.componentService.getMessage().subscribe(message => {
                this.screen = message;
              });
             }

  ngOnInit() {
    this.buildForm();
    console.log(this.screen.inEdit)
    if(this.screen.inEdit !== ''){
      this.getById();
    }
  }

  buildForm(){
    
      this.peopleForm = this.formBuild.group({
        _id:'',
        createdAt:'',
        updatedAt:'',
        __v:'',
        amigo:'',
        nome: ['', [Validators.required, Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email]],

      });
  }

  back(){
    this.screen.inEdit = '';
		this.screen.propertie = '';
		this.componentService.sendMessage(this.screen);
  }

  submit(){
    if (this.validate(this.peopleForm)){
      let formAux: FormGroup;
      formAux = this.peopleForm;

      formAux.removeControl('createdAt');
      formAux.removeControl('updatedAt');
      formAux.removeControl("__v");
      
        
      if(this.screen.inEdit === ''){
        formAux.removeControl('_id');
        
        this.serviceHttp.postObjects('people',formAux.value)
        .subscribe((response:any) => {
          this.mySnackbar.setMessage("Amigo cadastrado com sucesso :)","Sucesso","success");
          
          this.peopleForm.reset({
            nome: '',
            email: ''
          });
         
        },err => {
          this.mySnackbar.setMessage("Não foi possivel adicionar um amigo :(","Falha","error");
        });

      }else {
        this.serviceHttp.updateObject('people',formAux.value)
        .subscribe((response:any) => {
          this.mySnackbar.setMessage("Amigo alterado com sucesso :)","Sucesso","success");
          this.peopleForm.reset({
            nome: '',
            email: ''
          });         
        },err => {
          this.mySnackbar.setMessage("Não foi possivel alterar um amigo :(","Falha","error");
        });
      }
    }

  }

  validate(f: FormGroup) {
		if (f.status === 'VALID') {
			return true;
		}

		this.formErrors = {
			'nome': '',
			'email': ''
		};

		this.validationMessages = {
			'nome': {
				'maxlength': 'Tamanho maximo não permitido',
				'required':  'O campo é obrigatorio !',
			},

			'email': {
        'required': 'O campo é obrigatorio !',
        'email': 'Por favor informe um e-mail valído'
			},

		};

		Object.entries(this.formErrors).forEach(([key, value]) => {
			const control = f.get(key);
			if (control && !control.valid) {
				const messages = this.validationMessages[key];

				Object.entries(control.errors).forEach(([k, v]) => {
					if (Object.prototype.hasOwnProperty.call(control.errors, k)) {
						this.formErrors[key] += messages[k] + ' ';
					}
				});
			}
		});

		let errors: string = '';
		Object.entries(this.formErrors).forEach(([key, value]) => {
			if (errors) {
				errors += '</br>';
			}
			errors += value;
		});

  }
  
  getById(){
    this.serviceHttp.getObjects('people',this.screen.inEdit)
    .subscribe((res:any) =>{
      this.peopleForm.setValue(res.dados);
    });
  }
}
