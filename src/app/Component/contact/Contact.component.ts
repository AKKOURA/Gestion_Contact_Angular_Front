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
import { ToastrService } from 'ngx-toastr';
import { CreateContact_modalComponent } from './create-contact-modal/create-contact_modal/create-contact_modal.component';



@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.scss']
})
export class ContactComponent implements OnInit {
   address: any;
  contactList: ContactEntity[] = [];
  public newContact :ContactEntity={
    idContact :0,
    firstName : "",
    lastName: "",
    email: "",
    address : new AddressEntity(),
    contactGroups: [],
    phones : [new PhoneNumberEntity("")] ,
};
  constructor(
    private contactService : ContactService,
    private dialog: MatDialog,
    private router: Router,
    private toastService : ToastrService
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
  updatePhones(selectedPhones :any[], idContact :number){
    this.contactService.addPhonesToContact(selectedPhones,idContact)
    . subscribe ((result : boolean )=>{
     console.log(result)
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
      }
    );

  }
  updateGroupes(selectedGroupes :any[], idContact :number){
    this.contactService.addGroupesToContact(selectedGroupes,idContact)
    . subscribe ((result : boolean )=>{
     console.log(result)
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
          //contact.contactGroups = result.selectedGroupes;
            this.contactService.updateContat(contact).subscribe({
              next :()=>{
                this.updateGroupes(result.selectedGroupes,contact.idContact)
                this.router.navigate(['/contacts']);
                  this.toastService.success('Le contact est bien été modifié ',"Succès")
              },
              error :()=>  this.toastService.error('Erreur lors de la modification',"Erreur")
            });
         
        }

    });

  }
  addContact() {
    const dialogRef = this.dialog.open(CreateContact_modalComponent, {
      data: {},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
        if(result!=null){
          this.newContact.lastName = result?.contactForm?.lastName;
          this.newContact.firstName = result?.contactForm?.firstName;
          this.newContact.email = result?.contactForm?.email;
          this.newContact.address = new AddressEntity() ;
          this.newContact.address.address = result?.contactForm?.addressLabel;
          this.newContact.phones = result.selectedPhones;
           this.newContact.contactGroups = result.selectedGroupes;
            this.contactService.createContact(this.newContact).subscribe({
              next :(res)=>{
                this.router.navigate(['/contacts']);
                  this.toastService.success('Le contact est bien ajouté dans le répertoire',"Succès")
              },
              error :()=>  this.toastService.error('Erreur lors de lajout',"Erreur")
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
