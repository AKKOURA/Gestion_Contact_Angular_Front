import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/Contact.service';

@Component({
  selector: 'app-create-groupe-modal',
  templateUrl: './create-groupe-modal.component.html',
  styleUrls: ['./create-groupe-modal.component.scss']
})
export class CreateGroupeModalComponent implements OnInit   {
  groupeForm!: FormGroup;
  submitted!: boolean;
  isLoading: boolean = true;

  constructor(  public dialogRef: MatDialogRef<CreateGroupeModalComponent>,
    private contactService:ContactService){}

  ngOnInit(){
    this.groupeForm = new FormGroup({
      label : new FormControl(null, Validators.required),
    });  
  }

  save() {
    this.dialogRef.close({groupeForm:this.groupeForm.value});
  }

  close() {
    this.dialogRef.close();
  }
}
