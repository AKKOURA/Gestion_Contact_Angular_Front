import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneNumberEntity } from '../../../../entities/PhoneNumberEntity';
import { ContactGroupEntity } from '../../../../entities/ContactGroupEntity';
import { ContactService } from 'src/app/services/Contact.service';

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

  phones : PhoneNumberEntity[] =[];
  selectedPhoneIds!: number[];
  addPhone = (term: any) => ({idPhoneNumber: term, phoneNumber: term});

  groupes : ContactGroupEntity[] =[];
  selectedGroupeIds!: number[];
  addGroupe = (term: any) => ({idContactGroup: term, label: term});

  constructor(
   public dialogRef: MatDialogRef<CreateContact_modalComponent>,
   private contactService:ContactService
   //@Inject(MAT_DIALOG_DATA) public contact :ContactEntity,
  ) { }

  
  ngOnInit(){
    this.contactForm = new FormGroup({
      firstName : new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      addressLabel: new FormControl(null,Validators.required)
    });

    this.contactService.getGroupes().subscribe((data=>{
      this.groupes=data
    }))

    this.contactService.getPhones().subscribe((data=>{
      this.phones=data
    }))
    
  }

  save() {
    this.dialogRef.close({contactForm:this.contactForm.value,selectedGroupes:this.selectedGroupeIds, selectedPhones:this.selectedPhoneIds});
  }

  close() {
    this.dialogRef.close();
  }

}
