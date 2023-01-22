import { Component, OnInit } from '@angular/core';
import { AriaDescriber } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressEntity } from 'src/app/entities/AddressEntity';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { PhoneNumberEntity } from 'src/app/entities/PhoneNumberEntity';

import { ToastrService } from 'ngx-toastr';
import { CreateContact_modalComponent } from '../Component/contact/create-contact-modal/create-contact_modal/create-contact_modal.component';
import { ContactService } from '../services/Contact.service';
import { ContactGroupEntity } from '../entities/ContactGroupEntity';
import { CreateGroupeModalComponent } from './create-groupe-modal/create-groupe-modal.component';
import { UpdateGroupeModalComponent } from './update-groupe-modal/update-groupe-modal.component';
@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {

  groupeList: ContactGroupEntity[] = [];

  public newContact :ContactEntity={
    idContact :0,
    firstName : "",
    lastName: "",
    email: "",
    address : new AddressEntity(),
    contactGroups: [],
    phones : [new PhoneNumberEntity("")] ,
};

public newGroupe :ContactGroupEntity={
  idContactGroup:0,
  contacts:[],
  label:""

}

  constructor(
    private contactService : ContactService,
    private dialog: MatDialog,
    private router: Router,
    private toastService : ToastrService
  ) { }

  ngOnInit() {
    this.getAllGroupes();
  }

  public getAllGroupes(){
    this.contactService.getGroupes()
    . subscribe ((data :ContactGroupEntity [] )=>{
      this.groupeList = data;
      console.log(data)
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
      }
    );
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
                  this.toastService.success('Le contact est bien ajouté dans le répertoire',"Succès")
              },
              error :()=>  this.toastService.error('Erreur lors de lajout',"Erreur")
            });
         
        }

    });
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
                  this.router.navigate(['/groupes']);
                     window.location.reload();
                    this.toastService.success('Le groupe est bien ajouté dans le répertoire',"Succès")
                },
                error :()=>  this.toastService.error('Erreur lors de lajout',"Erreur")
              });
           
          }
  
      });
  }
  
  public updateGroupe(groupe:ContactGroupEntity){

    const dialogRef = this.dialog.open(UpdateGroupeModalComponent, {
      data:groupe,
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result!=null){
          groupe.label= result?.groupeForm?.label;
            this.contactService.updateGroupe(groupe).subscribe({
              next :()=>{
                this.router.navigate(['/groupe']);
                  this.toastService.success('Le groupe est bien été modifié ',"Succès")
              },
              error :()=>  this.toastService.error('Erreur lors de la modification',"Erreur")
            });
         
        }

    });

  }
  
  public deleteGroupe(groupe:ContactGroupEntity){
    this.contactService.deletegroupe(groupe.idContactGroup)
    . subscribe ((rep :any )=>{
     if(rep){
      this.getAllGroupes();
     }
     this.toastService.success('Le groupe a bien été supprimé',"Succès")
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
      }
    );
  }

}
