import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  certificateTitle: string;
  issueData: string;
  description: string;
}

@Component({
  selector: 'app-about-user',
  templateUrl: './user-certificates.component.html',
  styleUrls: ['./user-certificates.component.css']
})
export class UserCertificatesComponent implements OnInit {
  certificateTitle: string;
  issueDate: string;
  description: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(
      UserCertificatesModalComponent, {
        width: '500px',
        data: {
          certificateTitle: this.certificateTitle,
          issueDate: this.issueDate,
          description: this.description
        }
      }
    );
    dialogRef.afterClosed()
    .subscribe(result => {
      console.log('dialog close');
    });
  }

  ngOnInit(): void {
  }

}

@Component(
  {
    selector: 'user-certificate-modal',
    templateUrl: 'user-certificates-modal.html'
  }
)

export class UserCertificatesModalComponent{

  constructor(public dialogRef: MatDialogRef<UserCertificatesModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: DialogData){}

    onNoClick(): void{
      this.dialogRef.close();
    }

}
