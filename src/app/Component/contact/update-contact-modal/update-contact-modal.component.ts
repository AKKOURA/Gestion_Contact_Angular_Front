import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactEntity } from 'src/app/entities/ContactEntity';

@Component({
  selector: 'app-update-contact-modal',
  templateUrl: './update-contact-modal.component.html',
  styleUrls: ['./update-contact-modal.component.css']
})
export class UpdateContactModalComponent implements OnInit {

  contactForm!: FormGroup;
  submitted!: boolean;
  isLoading: boolean = true; 

  constructor(
   public dialogRef: MatDialogRef<UpdateContactModalComponent>,
   @Inject(MAT_DIALOG_DATA) public contact : ContactEntity,
  ) { 
  }

  
  ngOnInit(){
 
    //this.getReferentiels();
    this.contactForm = new FormGroup({
      firstName : new FormControl(this.contact?.firstName, Validators.required),
      lastName: new FormControl(this.contact?.lastName, Validators.required),
      email: new FormControl(this.contact?.email, Validators.required),
      address: new FormControl(this.contact?.Address?.address),
      // contactGroups:new FormControl(null),
      // phones:new FormControl(null)
    });
    
  }
  getReferentiels(){

  }

  save() {
    this.dialogRef.close(this.contactForm.value);
  }

  close() {
      this.dialogRef.close();
  }


}
