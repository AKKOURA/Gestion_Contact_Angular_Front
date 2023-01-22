import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { ContactGroupEntity } from 'src/app/entities/ContactGroupEntity';
import { ContactService } from 'src/app/services/Contact.service';
import { AddContactToGroupComponent } from '../add-contact-to-group/add-contact-to-group.component';

@Component({
  selector: 'app-delete-contact-from-group',
  templateUrl: './delete-contact-from-group.component.html'
})
export class DeleteContactFromGroupComponent implements OnInit {

  contactsGroup: ContactEntity[]=[];
  constructor(
    private dialogRef: MatDialogRef<AddContactToGroupComponent>,
    private contactService : ContactService,
    @Inject(MAT_DIALOG_DATA) public groupe :ContactGroupEntity,
    private toastService : ToastrService
  ) {

   }
  
  ngOnInit() {
    this.contactService.getContactsByGroup(this.groupe.idContactGroup).subscribe((data:any[])=>{
      this.contactsGroup = data;
      console.log(data)
    })
  }
 

  deleteContactFromGroup(idContact: number, idContactGroup: number) {
    this.contactService.deleteContactFromGroup(idContact,idContactGroup)
    . subscribe (()=>{
     this.ngOnInit();
     this.toastService.success('Le contact a bien été supprimé à ce groupe',"Succès");
    },
    (error:HttpErrorResponse)=>{
      this.toastService.error('Erreur lors de lajout',"Erreur")
      }
    );
  }
  
  close(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
 
}
