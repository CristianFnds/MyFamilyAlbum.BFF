export class Geo {
  lat: string;
  lng: string;
}

export class Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export class Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export class User {
  constructor(
    public id: number,
    public name: string,
    public username: string,
    public email: string,
    public address: Address | null,
    public phone: string,
    public website: string,
    public company: Company | null,
  ) {}
}
