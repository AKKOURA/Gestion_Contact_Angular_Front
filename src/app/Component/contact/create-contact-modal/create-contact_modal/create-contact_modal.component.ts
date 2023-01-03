import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneNumberEntity } from '../../../../entities/PhoneNumberEntity';

@Component({
  selector: 'app-create-contact_modal',
  templateUrl: './create-contact_modal.component.html',
  styleUrls: ['./create-contact_modal.component.css'] 
})

export class CreateContact_modalComponent implements OnInit {

  contactForm!: FormGroup;
  submitted!: boolean;
  isLoading: boolean = true; 
  @Input() modalTitle : string="";


  constructor(
   public dialogRef: MatDialogRef<CreateContact_modalComponent>,
   //@Inject(MAT_DIALOG_DATA) public contact :ContactEntity,
  ) { }

  
  ngOnInit(){
    this.getReferentiels();
    this.contactForm = new FormGroup({
      firstName : new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      addressLabel: new FormControl(null,Validators.required),
     groupe:new FormControl(null,Validators.required),
     phonelabel:new FormControl(null,Validators.required)
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
