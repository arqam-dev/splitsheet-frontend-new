import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData{
  jobTitle: string;
  compantName: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;

}

@Component({
  selector: 'app-about-user',
  templateUrl: './user-experience.component.html',
  styleUrls: ['./user-experience.component.css']
})
export class UserExperienceComponent implements OnInit {

  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  formData;

  constructor(public dialog: MatDialog) { }

  openDialog(): void{
    const dialogRef = this.dialog.open(UserExperienceModalComponent,{
      width: '500px',
      data : {
        jobTitle: this.jobTitle,
        compantName: this.companyName,
        startDate: this.startDate,
        endDate: this.endDate,
        currentJob: this.currentJob
      }
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      console.log('dialog closed');
      this.formData = result;
      console.log(this.formData);
    });


  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'user-experience-modal',
  templateUrl: 'user-experience-modal.html'
})

export class UserExperienceModalComponent{
  constructor(public dialogRef: MatDialogRef<UserExperienceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){}

    onNoClick(): void{
      this.dialogRef.close();
    }
}
