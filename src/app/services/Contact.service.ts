import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactEntity } from '../entities/ContactEntity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

constructor(private http: HttpClient) { }

getAllContacts() : Observable<ContactEntity[]>{
  return this.http.get<ContactEntity[]>("/api/CarnetContactProjet/contacts");
}

deleteContact(id:number):Observable<number>{
  return this.http.get<number>(`/api/CarnetContactProjet/delete/${id}`);
}
createContact(newContact:ContactEntity):Observable<boolean>{
  return this.http.post<boolean>("/api/CarnetContactProjet/create",newContact);
}
updateContat(contactToUpdate:number):Observable<boolean>{
  return this.http.post<boolean>("/api/CarnetContactProjet/update",contactToUpdate);
}

}
