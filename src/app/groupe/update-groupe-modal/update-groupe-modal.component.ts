import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgSelectComponent } from '@ng-select/ng-select';
import { forkJoin } from 'rxjs';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { ContactGroupEntity } from 'src/app/entities/ContactGroupEntity';
import { PhoneNumberEntity } from 'src/app/entities/PhoneNumberEntity';
import { ContactService } from 'src/app/services/Contact.service';

@Component({
  selector: 'app-update-groupe-modal',
  templateUrl: './update-groupe-modal.component.html',
  styleUrls: ['./update-groupe-modal.component.scss']
})
export class UpdateGroupeModalComponent implements OnInit {
  groupeForm!: FormGroup;
  submitted!: boolean;
  isLoading: boolean = true; 

  constructor( @Inject(MAT_DIALOG_DATA) public groupe : ContactGroupEntity,  
  public dialogRef: MatDialogRef<UpdateGroupeModalComponent>,
  public contactService : ContactService,){}

  ngOnInit(){
    this.groupeForm = new FormGroup({
      label : new FormControl(this.groupe?.label, Validators.required)
    });
    
  }

  save() {
    this.dialogRef.close({groupeForm:this.groupeForm.value});
  }


  close() {
    this.dialogRef.close();
  }
}
