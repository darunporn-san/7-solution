export interface IUser {
    users: IDetailUser[];
    total: number;
    skip: number;
    limit: number;
  }
  
export  interface IDetailUser {
    address: IAddress;
    age: number;
    bank: IBank;
    birthDate: Date;
    bloodGroup: string;
    company: ICompany;
    domain: string;
    ein: string;
    email: string;
    eyeColor: string;
    firstName: string;
    gender: Gender;
    hair: IHair;
    height: number;
    id: number;
    image: string;
    ip: string;
    lastName: string;
    macAddress: string;
    maidenName: string;
    password: string;
    phone: string;
    ssn:string;
    university: string;
    userAgent:string;
    username:string;
    weight:number
  }
  interface IAddress {
    address: string;
    city?: string;
    coordinates: ICoordinates;
    postalCode: string;
    state: string;
  }
  
  interface ICoordinates {
    lat: number;
    lng: number;
  }
  
  interface IBank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  }
  
  interface ICompany {
    address: IAddress;
    department: string;
    name: string;
    title: string;
  }
  
  export interface IHair {
    color: string;
    type: string;
  }
  
   enum Gender {
      Female = "female",
      Male = "male",
  }
  