import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { ContactGroupEntity } from 'src/app/entities/ContactGroupEntity';
import { ContactService } from 'src/app/services/Contact.service';

@Component({
  selector: 'app-delete-group-from-contact',
  templateUrl: './delete-group-from-contact.component.html',
  styleUrls: ['./delete-group-from-contact.component.scss']
})
export class DeleteGroupFromContactComponent implements OnInit {


  groupOfContactList:ContactGroupEntity[] =[];

  constructor(
    private dialogRef: MatDialogRef<DeleteGroupFromContactComponent>,
    private contactService : ContactService,
    @Inject(MAT_DIALOG_DATA) public contact :ContactEntity,
    private toastService : ToastrService
  ) { }

  ngOnInit(): void {
    this.contactService.getGroupesByIdContact(this.contact.idContact).subscribe((data:any[])=>{
      this.groupOfContactList = data;
    })
  }

  deleteGroupFromContact(idContactGroup: number,idContact: number) {
    this.contactService.deleteGroupeFromContact(idContactGroup,idContact)
    . subscribe (()=>{
      this.ngOnInit();
     this.toastService.success('Ce groupe a bien été retiré du ce contact',"Succès");
   
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
 

}
