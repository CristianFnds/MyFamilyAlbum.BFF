export class JwtPayload {
  userId: number;
  email: string;
  name: string;
  iat: number;
  exp: number;

  constructor(
    userId: number,
    email: string,
    name: string,
    iat: number,
    exp: number,
  ) {
    this.userId = userId;
    this.email = email;
    this.name = name;
    this.iat = iat;
    this.exp = exp;
  }
}
