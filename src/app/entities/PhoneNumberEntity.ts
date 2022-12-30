import { ContactEntity } from './ContactEntity';
export class PhoneNumberEntity{
    idPhoneNumber! : number;
    phoneNumber! : string;
    contact! :ContactEntity 
    constructor(
        phoneNumber : string,
    ){
        this.phoneNumber =phoneNumber;


    }

}