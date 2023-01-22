import { ContactEntity } from './ContactEntity';
export class ContactGroupEntity{
    idContactGroup! : number;
    contacts! : ContactEntity[];
    label ! : string;
    constructor(label:string){
        this.label=label

    }
}