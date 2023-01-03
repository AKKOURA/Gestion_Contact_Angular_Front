import { ContactEntity } from './ContactEntity';
export class PhoneNumberEntity{
    idPhoneNumber! : number;
    phoneNumber! : string;
    contact! :ContactEntity |null
    constructor(
        phoneNumber : string,
    ){
        this.phoneNumber =phoneNumber;


    }

}