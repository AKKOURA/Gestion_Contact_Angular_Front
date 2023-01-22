import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactEntity } from 'src/app/entities/ContactEntity';
import { ContactService } from 'src/app/services/Contact.service';
import { ContactGroupEntity } from '../../../entities/ContactGroupEntity';

@Component({
  selector: 'app-add-group-to-contact.',
  templateUrl: './add-group-to-contact.component.html',
  styleUrls: ['./add-group-to-contact.component.scss']
})
export class AddGroupToContactComponent implements OnInit {

  groupesToJoin: ContactGroupEntity[] =[];

  constructor(
    private dialogRef: MatDialogRef<AddGroupToContactComponent>,
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
     this.toastService.success('Ce groupe a bien été ajouté à ce contact ',"Succès");
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
