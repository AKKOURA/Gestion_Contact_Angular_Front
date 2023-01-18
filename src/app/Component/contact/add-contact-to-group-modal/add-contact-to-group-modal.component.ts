import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/Contact.service';

@Component({
  selector: 'app-add-contact-to-group-modal',
  templateUrl: './add-contact-to-group-modal.component.html',
  styleUrls: ['./add-contact-to-group-modal.component.scss']
})
export class AddContactToGroupModalComponent implements OnInit {

  groupList :any[] =[]

  constructor(
    private contactService : ContactService,
  ) { }

  ngOnInit(): void {
    this.getAllGroup()
  }

  public getAllGroup() {
    this.contactService.getGroupes().subscribe((data:any[])=>{
      this.groupList = data;
      console.log('groupe list', this.groupList)
    })
  }

  public ajouter(idGroupe:any){
    //service d'envoie
  }

}
