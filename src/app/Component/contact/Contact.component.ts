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
import { DeteteContactFromGroupComponent } from './detete-contact-from-group/detete-contact-from-group.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { ContactGroupEntity } from 'src/app/entities/ContactGroupEntity';
import { CreateGroupeModalComponent } from 'src/app/groupe/create-groupe-modal/create-groupe-modal.component';



@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.scss']
})
export class ContactComponent implements OnInit {
   address: any;
  contactList: ContactEntity[] = [];
  result: string = '';
  public newGroupe :ContactGroupEntity={
    idContactGroup:0,
    contacts:[],
    label:""
  
  }

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
            this.contactService.updateContat(contact).subscribe({
              next :()=>{
                this.router.navigate(['/contacts']);
                  this.toastService.success('Le contact a bien été modifié ',"Succès")
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
              next :()=>{
                   window.location.reload();
                  this.toastService.success('Le contact a bien ajouté dans le répertoire',"Succès")
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

  public deleteContactFromGroup(contact :ContactEntity){

    const dialogRef = this.dialog.open(DeteteContactFromGroupComponent, {
      data:contact,
    }); 
  }
  confirmDialog(contact :ContactEntity): void {
    const message = `Etes-vous sûr de vouloir supprimer le contact ${contact.lastName} ?`;

    const dialogData = new ConfirmDialogModel("Confirmation", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      this.deleteContact(contact);
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
  addGroupe(){
    const dialogRef = this.dialog.open(CreateGroupeModalComponent, {
      data: {},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
        if(result!=null){
          this.newGroupe.label= result?.groupeForm?.label;
            this.contactService.createGroupe(this.newGroupe).subscribe({
              next :()=>{
                //this.router.navigate(['/groupes']);
                   window.location.reload();
                  this.toastService.success('Le groupe est bien ajouté dans le répertoire',"Succès")
              },
              error :()=>  this.toastService.error('Erreur lors de lajout',"Erreur")
            });
         
        }

    });
}

  


}
