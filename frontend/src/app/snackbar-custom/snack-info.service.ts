import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SnackbarCustomComponent } from './snackbar-custom.component';


//

@Injectable({
	providedIn: 'root'
})
export class SnackBarService {
	constructor(private snackBar: MatSnackBar) {}

	setMessage(message: string, title?: string, type?: string, duration?: number) {
		if (!duration) {
			duration = 3000;
		}
		if (type === 'error' || type === 'erro') {
			type = 'background-red';
		} else if (type === 'success' || type === 'sucesso') {
			type = 'background-green';
        }
        
        const config = new MatSnackBarConfig();
        config.panelClass = [type];
        
		this.snackBar.openFromComponent(SnackbarCustomComponent, {
			duration: duration,
			verticalPosition: 'top',
			data: {
				message: message,
				title: title
			},
			panelClass: [type]
		});
	}
}
