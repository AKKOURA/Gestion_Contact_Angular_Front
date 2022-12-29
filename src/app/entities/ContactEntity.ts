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
    phones: number;  
    constructor(firstName : string,
        lastName: string,
        email : string,phones:PhoneNumberEntity){
            this.firstName =firstName;
            this.lastName =lastName;
            this.email=email;
            this.phones=phones.idPhoneNumber;

    }
}