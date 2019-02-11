import { Routes } from '@angular/router';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ControlePeopleComponent } from './controle-people/controle-people.component';


export const ROUTES : Routes = [
    {
        path:'',
        component: ControlePeopleComponent
    },
]