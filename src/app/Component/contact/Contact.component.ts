import { AriaDescriber } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressEntity } from 'src/app/entities/AddressEntity';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { PhoneNumberEntity } from 'src/app/entities/PhoneNumberEntity';
import { ContactService } from '../../services/Contact.service';
import { AddContactToGroupModalComponent } from './add-contact-to-group-modal/add-contact-to-group-modal.component';
import { UpdateContactModalComponent } from './update-contact-modal/update-contact-modal.component';



@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.scss']
})
export class ContactComponent implements OnInit {
   address: any;
  contactList: ContactEntity[] = [];
  
  constructor(
    private contactService : ContactService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllContacts();
  }


  public getAllContacts(){
    this.contactService.getAllContacts()
    . subscribe ((data :ContactEntity [] )=>{
      this.contactList = data;
      console.log(data)
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
      }
    );
  }
  public updateContact(contact :ContactEntity){

    const dialogRef = this.dialog.open(UpdateContactModalComponent, {
      data:contact,
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result!=null){
          contact.lastName = result?.contactForm?.lastName;
          contact.firstName = result?.contactForm?.firstName;
          contact.email = result?.contactForm?.email;
          contact.address.address = result?.contactForm?.address;
          contact.phones = result.selectedPhones;
          console.log(result.selectedPhones);
          console.log(result.selectedGroupes)
          contact.contactGroups = result.selectedGroupes;
            this.contactService.updateContat(contact).subscribe({
              next :()=>{
                this.router.navigate(['/contacts']);
                 // this.toastService.success('Le contact est bien ajouté dans le répertoire',"Success")
              },
              //error :()=>  //this.toastService.error('Erreur lors de lajout',"Error")
            });
         
        }

    });

  }

  public addContactToGroup(contact :ContactEntity){
    const dialogRef = this.dialog.open(AddContactToGroupModalComponent, {
      data:contact,
    }); 
  }

  public deleteContact(contact :ContactEntity){
    this.contactService.deleteContact(contact.idContact)
    . subscribe ((rep :any )=>{
     if(rep){
      this.getAllContacts();
     }
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
      }
    );
  }


}
