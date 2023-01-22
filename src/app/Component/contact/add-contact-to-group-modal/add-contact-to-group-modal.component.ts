import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { ContactService } from 'src/app/services/Contact.service';
import { ContactGroupEntity } from '../../../entities/ContactGroupEntity';

@Component({
  selector: 'app-add-contact-to-group-modal',
  templateUrl: './add-contact-to-group-modal.component.html',
  styleUrls: ['./add-contact-to-group-modal.component.scss']
})
export class AddContactToGroupModalComponent implements OnInit {

  groupesToJoin: ContactGroupEntity[] =[];

  constructor(
    private dialogRef: MatDialogRef<AddContactToGroupModalComponent>,
    private contactService : ContactService,
    @Inject(MAT_DIALOG_DATA) public contact :ContactEntity,
    private toastService : ToastrService
  ) { }

  ngOnInit(): void {
    this.contactService.getGroupesForAddCntact(this.contact.idContact).subscribe((data:any[])=>{
      this.groupesToJoin = data;
    })
  }
 

  addGroupToContact(idContactGroup: number,idContact: number) {
    this.contactService.addGroupeToContact(idContactGroup,idContact)
    . subscribe (()=>{
     this.ngOnInit();
     this.toastService.success('Le contact a bien été ajouté à ce groupe',"Succès");
    },
    (error:HttpErrorResponse)=>{
      this.toastService.error('Erreur lors de lajout',"Erreur")
      }
    );
  }
  
  deleteGroupFromContact(idContactGroup: number,idContact: number) {
    this.contactService.deleteGroupeFromContact(idContactGroup,idContact)
    . subscribe ((result : boolean )=>{
     console.log(result);
     this.toastService.success('Le groupe a bien été supprimé au contact',"Succès");
    },
    (error:HttpErrorResponse)=>{
      this.toastService.error('Erreur lors de la supression',"Erreur")
      }
    );
  }
  close(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
 
    

  public ajouter(idGroupe:any){
    //service d'envoie
  }

}
