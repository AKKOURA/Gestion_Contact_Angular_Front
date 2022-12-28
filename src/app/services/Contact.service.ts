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
  return this.http.get<ContactEntity[]>("http://localhost:8080/CarnetContactProjet/contacts");
}

deleteContact(id:number):Observable<number>{
  return this.http.get<number>(`http://localhost:8080/CarnetContactProjet/delete/${id}`);
}
createContact(newContact:ContactEntity):Observable<boolean>{
  return this.http.post<boolean>("http://localhost:8080/CarnetContactProjet/create",newContact);
}
updateContat(contactToUpdate:ContactEntity):Observable<boolean>{
  return this.http.post<boolean>("http://localhost:8080/CarnetContactProjet/edit",contactToUpdate);
}

}
