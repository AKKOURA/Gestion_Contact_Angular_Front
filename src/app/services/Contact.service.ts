import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactEntity } from '../entities/ContactEntity';
import { map, Observable } from 'rxjs';
import { PhoneNumberEntity } from '../entities/PhoneNumberEntity';
import { ContactGroupEntity } from '../entities/ContactGroupEntity';
const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};
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

deletegroupe(id:number):Observable<number>{
  return this.http.get<number>(`http://localhost:8080/CarnetContactProjet/deletegroupe/${id}`);
}

createContact(newContact:ContactEntity):Observable<boolean>{
  return this.http.post<boolean>("http://localhost:8080/CarnetContactProjet/create",newContact);
}
createGroupe(newGroupe:ContactGroupEntity):Observable<boolean>{
  return this.http.post<boolean>("http://localhost:8080/CarnetContactProjet/creategroupe",newGroupe);
}

updateContat(contactToUpdate:ContactEntity):Observable<boolean>{
  return this.http.post<boolean>("http://localhost:8080/CarnetContactProjet/update",contactToUpdate);
}

updateGroupe(groupeUpdate:ContactGroupEntity):Observable<boolean>{
  return this.http.post<boolean>("http://localhost:8080/CarnetContactProjet/updategroupe",groupeUpdate);
}
addPhonesToContact(phones : any[],idContact :number):Observable<boolean>{
  return this.http.post<boolean>(`http://localhost:8080/CarnetContactProjet/add-phones-to-contact/${idContact}`,phones);
}
addGroupesToContact(groupes : any[],idContact :number):Observable<boolean>{
  return this.http.post<boolean>(`http://localhost:8080/CarnetContactProjet/add-groupes-to-contact/${idContact}`,groupes);
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

getAdressByIdContact( idContact : number) : Observable<any>{
  return this.http.get(`http://localhost:8080/CarnetContactProjet/${idContact}/address`, {responseType: 'text'});
}


}
