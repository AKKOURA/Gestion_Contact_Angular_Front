import { AddressEntity } from "./AddressEntity";
import { ContactGroupEntity } from "./ContactGroupEntity";
import { PhoneNumberEntity } from "./PhoneNumberEntity";


export class ContactEntity{
    idContact!: number;
    firstName! : string;
    lastName!: string;
    email! : string;
    Address! : AddressEntity;

    contactGroups! : ContactGroupEntity[];
    phones! : PhoneNumberEntity[];

    
}