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
  selector: 'app-update-contact-modal',
  templateUrl: './update-contact-modal.component.html',
  styleUrls: ['./update-contact-modal.component.css']
})
export class UpdateContactModalComponent implements OnInit {

  contactForm!: FormGroup;
  submitted!: boolean;
  isLoading: boolean = true; 
  phones : PhoneNumberEntity[] =[];
  selectedPhones!: any[];
  addPhone = (term: any) => ({idPhoneNumber: term, phoneNumber: term});
  
  groupes : ContactGroupEntity[] =[];
  selectedGroupes!: any[];

  addGroupe = (term: any) => ({idContactGroup: term, label: term});

  constructor(
   public dialogRef: MatDialogRef<UpdateContactModalComponent>,
   public contactService : ContactService,
   @Inject(MAT_DIALOG_DATA) public contact : ContactEntity,
  ) { 
  }

  
  ngOnInit(){
 
    this.getReferentiels();
    this.contactForm = new FormGroup({
      firstName : new FormControl(this.contact?.firstName, Validators.required),
      lastName: new FormControl(this.contact?.lastName, Validators.required),
      email: new FormControl(this.contact?.email, Validators.required),
      address: new FormControl(this.contact?.address?.address, Validators.required)
    });
    
  }

  getReferentiels(){
   forkJoin([
    this.contactService.getGroupesByIdContact(this.contact.idContact),
    this.contactService.getPhonesByIdContact(this.contact.idContact),
    this.contactService.getGroupes(),
    this.contactService.getPhones(),
   ]).subscribe((data : [ContactGroupEntity[],PhoneNumberEntity[],ContactGroupEntity[],PhoneNumberEntity[]] )=>{
      this.groupes =data[2];
      this.phones =data[1];
      this.selectedGroupes= data[0].map(g => g.label);
      this.selectedPhones =  data[1].map(g => g.phoneNumber);
    })
  }
  
  save() {
    this.dialogRef.close({contactForm:this.contactForm.value,selectedGroupes:this.selectedGroupes, selectedPhones:this.selectedPhones});
  }


  close() {
    this.dialogRef.close();
  }


}
