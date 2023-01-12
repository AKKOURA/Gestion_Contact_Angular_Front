import { Component, OnInit } from '@angular/core';
import { CreateContact_modalComponent } from '../contact/create-contact-modal/create-contact_modal/create-contact_modal.component';
import { ContactService } from 'src/app/services/Contact.service';
import {MatDialog} from  '@angular/material/dialog' ;
import { Router } from '@angular/router';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { AddressEntity } from 'src/app/entities/AddressEntity';
import { ToastrService } from 'ngx-toastr';
import { PhoneNumberEntity } from 'src/app/entities/PhoneNumberEntity';
import { ContactGroupEntity } from 'src/app/entities/ContactGroupEntity';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

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
    private toastService: ToastrService
  ) {  }

  ngOnInit() {
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
  rechercher(){}
  disconnect(){}

}
