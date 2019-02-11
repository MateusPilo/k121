import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar-custom',
  templateUrl: './snackbar-custom.component.html',
  styleUrls: ['./snackbar-custom.component.css']
})
export class SnackbarCustomComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any) { }

  ngOnInit() {
  }

}
