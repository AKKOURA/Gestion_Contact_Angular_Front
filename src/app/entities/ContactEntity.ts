import { AddressEntity } from "./AddressEntity";
import { ContactGroupEntity } from "./ContactGroupEntity";
import { PhoneNumberEntity } from "./PhoneNumberEntity";


export class ContactEntity{
    idContact!: number;
    firstName! : string;
    lastName!: string;
    email! : string;
    address! : AddressEntity;

    contactGroups! : ContactGroupEntity[]|null;
    phones!: PhoneNumberEntity[]|null;  

    constructor(
        firstName : string,
        lastName: string,
        email : string,
        address : AddressEntity,
        contactGroups: ContactGroupEntity[] |null = null,
        phones: PhoneNumberEntity[]|null = null 
    ){
        this.firstName =firstName;
        this.lastName =lastName;
        this.email=email;
        this.address = address,
        this.contactGroups=contactGroups,
        this.phones = phones
    }
}