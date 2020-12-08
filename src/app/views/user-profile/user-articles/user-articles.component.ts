import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

export interface DialogData{
  articleTitle:string;
  description: string;
  category: string;
}
@Component({
  selector: 'app-about-user',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.css']
})
export class UserArticlesComponent implements OnInit {
  articleTitle:string;
  description: string;
  category: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void{
    const dialogRef = this.dialog.open(UserArticlesModalComponent,{
      width: '500px',
      data: {
        articleTitle: this.articleTitle,
        description: this.description,
        category: this.category
      }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      console.log('dialog closed');
    });
  }

  ngOnInit(): void {
  }

}

@Component(
  {
    selector: 'user-articles-modal',
    templateUrl: 'user-articles-modal.html'
  }
)

export class UserArticlesModalComponent{

  constructor( public dialogRef: MatDialogRef<UserArticlesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){}

    onNoClick(): void{
      this.dialogRef.close();
    }

}