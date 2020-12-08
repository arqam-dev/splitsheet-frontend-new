import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  degree: string;
  institute: string;
}

@Component({
  selector: 'app-about-user',
  templateUrl: './user-qualification.component.html',
  styleUrls: ['./user-qualification.component.css']
})
export class UserQualificationComponent implements OnInit {

  degree: string;
  institute: string;
  formData;

  constructor(public dialog: MatDialog) { }

  openDialog(): void{
    const dialogRef = this.dialog.open(UserQualificationModalComponent,{
      width: '500px',
      data : {
        degree : this.degree,
        institute: this.institute
      }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      console.log('dialog closed');
      this.formData = result;
    });
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'user-qualification-modal',
  templateUrl: 'user-qualification-modal.html'
})

export class UserQualificationModalComponent{
  
  constructor(public dialogRef: MatDialogRef<UserQualificationModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData ){}

  onNoClick(): void{
    this.dialogRef.close();
  }
}
