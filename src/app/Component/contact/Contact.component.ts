import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { ContactService } from '../../services/Contact.service';



@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactList: ContactEntity[] = [];

  constructor(
    private contactService : ContactService
  ) { }

  ngOnInit() {
    this.getAllContacts();
  }

  public getAllContacts(){
    this.contactService.getAllContacts()
    . subscribe ((data :ContactEntity [] )=>{
      this.contactList = data;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
      }
    );
  }
  public updateContact(Contact :ContactEntity){

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
