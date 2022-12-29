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
    phones!: PhoneNumberEntity;  
    constructor(firstName : string,
        lastName: string,
        email : string){
            this.firstName =firstName;
            this.lastName =lastName;
            this.email=email;

    }
}