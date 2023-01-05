import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selectedPhones : PhoneNumberEntity[] =[];
  selectedPhoneIds!: number[];
  addPhone = (term: any) => ({idPhoneNumber: term, phoneNumber: term});

  groupes : ContactGroupEntity[] =[];
  selectedGroupeIds!: number[];
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
      address: new FormControl(this.contact?.address?.address),
    });
    
  }
  getReferentiels(){
   forkJoin([
    this.contactService.getGroupesByIdContact(this.contact.idContact),
    this.contactService.getPhonesByIdContact(this.contact.idContact)
   ]).subscribe((data : [ContactGroupEntity[],PhoneNumberEntity[]] )=>{
      this.phones =data[1];
      this.groupes =data[0];
      this.selectedGroupeIds = data[0].map(g => g.idContactGroup);
      this.selectedPhoneIds =  data[1].map(g => g.idPhoneNumber);
 
    })
  }

  save() {
    this.dialogRef.close({contactForm:this.contactForm.value,selectedGroupes:this.selectedGroupeIds, selectedPhones:this.selectedPhoneIds});
  }

  close() {
      this.dialogRef.close();
  }


}
