import { Component, OnInit, Input } from '@angular/core';
import { ComponentsService } from '../services/components.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'controle-people',
  templateUrl: './controle-people.component.html',
  styleUrls: ['./controle-people.component.css']
})
export class ControlePeopleComponent implements OnInit {

  subscription: Subscription;
  @Input() screen: any ={
    propertie:''
  };

  constructor(private componentService: ComponentsService) { 
    this.subscription = this.componentService.getMessage().subscribe(message => {
      this.screen = message;
    });
  }
  

 
  ngOnInit() {
  }

}
