import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactEntity } from '../entities/ContactEntity';
import { Observable } from 'rxjs';
import { PhoneNumberEntity } from '../entities/PhoneNumberEntity';
import { ContactGroupEntity } from '../entities/ContactGroupEntity';

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
getPhonesByIdContact( idContact : number) : Observable<PhoneNumberEntity[]>{
  return this.http.get<PhoneNumberEntity[]>(`http://localhost:8080/CarnetContactProjet/${idContact}/phones`);
}
getGroupesByIdContact(idContact : number) : Observable<ContactGroupEntity[]>{
  return this.http.get<ContactGroupEntity[]>(`http://localhost:8080/CarnetContactProjet/${idContact}/groupes`);
}

getPhones() : Observable<PhoneNumberEntity[]>{
  return this.http.get<PhoneNumberEntity[]>(`http://localhost:8080/CarnetContactProjet/phones`);
}
getGroupes() : Observable<ContactGroupEntity[]>{
  return this.http.get<ContactGroupEntity[]>(`http://localhost:8080/CarnetContactProjet/groupes`);
}


}
