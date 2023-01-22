import { Component, Inject, OnInit } from '@angular/core';
import { ContactEntity } from '../../../entities/ContactEntity';
import { ContactGroupEntity } from 'src/app/entities/ContactGroupEntity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/Contact.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-contact-to-group',
  templateUrl: './add-contact-to-group.component.html'
})
export class AddContactToGroupComponent implements OnInit {

  contactToAddList: ContactEntity[]=[];
  constructor(
    private dialogRef: MatDialogRef<AddContactToGroupComponent>,
    private contactService : ContactService,
    @Inject(MAT_DIALOG_DATA) public groupe :ContactGroupEntity,
    private toastService : ToastrService
  ) {

   }
  
  ngOnInit() {
    this.contactService.getContactsForJoinGroup(this.groupe.idContactGroup).subscribe((data:any[])=>{
      this.contactToAddList = data;
    })
  }
 

  addContactToGroup(idContact: number, idContactGroup: number) {
    this.contactService.addContactToGroup(idContact,idContactGroup)
    . subscribe (()=>{
     this.ngOnInit();
     this.toastService.success('Le contact a bien été ajouté à ce groupe',"Succès");
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
