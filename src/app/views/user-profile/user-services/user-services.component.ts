import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-about-user',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.css']
})

export class UserServicesComponent {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(UserServicesModalComponent,{
      width: '500px',
      data : { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed()
    .subscribe(result =>{
      console.log('the dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'user-services-modal',
  templateUrl: 'user-services-modal.html',
})

export class UserServicesModalComponent {

  constructor(
    public dialogRef: MatDialogRef<UserServicesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
    this.dialogRef.close();
  }

  radioValue(data)
  {
    console.log(data);
  }
}