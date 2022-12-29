import { Component, OnInit } from '@angular/core';
import { CreateContact_modalComponent } from '../contact/create-contact-modal/create-contact_modal/create-contact_modal.component';
import { ContactService } from 'src/app/services/Contact.service';
import {MatDialog} from  '@angular/material/dialog' ;
import { Router } from '@angular/router';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { AddressEntity } from 'src/app/entities/AddressEntity';
import { ToastrService } from 'ngx-toastr';
import { PhoneNumberEntity } from 'src/app/entities/PhoneNumberEntity';

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
    Address : new AddressEntity(),
    contactGroups: [],
    phones : new PhoneNumberEntity(),
};
  constructor(
    private contactService : ContactService,
    private dialog: MatDialog,
    private router: Router,
    //private toastService: ToastrService
  ) {  }

  ngOnInit() {
  }
  addContact() {
    const dialogRef = this.dialog.open(CreateContact_modalComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result!=null){
          console.log(result)
            this.newContact = result;
            this.newContact.Address = new AddressEntity();
            this.newContact.Address.address = result.addressLabel;
            this.newContact.phones = new PhoneNumberEntity();
            this.newContact.phones.phoneNumber = result.phonelabel;
            this.contactService.createContact(this.newContact).subscribe({
              next :()=>{
                this.router.navigate(['/contacts']);
                 // this.toastService.success('Le contact est bien ajouté dans le répertoire',"Success")
              },
              //error :()=>  //this.toastService.error('Erreur lors de lajout',"Error")
            });
         
        }

    });
  }

}
