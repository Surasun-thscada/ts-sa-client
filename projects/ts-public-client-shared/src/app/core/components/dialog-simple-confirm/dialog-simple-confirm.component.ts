import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogSimpleConfirm } from 'projects/ts-public-client-lib/src/lib/models/dialog-simple-confirm.model';
import { MaterialModule } from '../../../modules/material.module';

@Component({
  selector: 'app-dialog-simple-confirm',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule, TranslocoModule],
  templateUrl: './dialog-simple-confirm.component.html',
  styleUrls: ['./dialog-simple-confirm.component.css']
})
export class DialogSimpleConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogSimpleConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSimpleConfirm) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
