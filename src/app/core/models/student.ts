
export class Student {
  id!: number;
  username!: string;
  firstname!: string;
  email!: string;
  lastLoginDate!: string;
  password!: string;
  token!: string;
  conect!: boolean;
  admin!: boolean;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.firstname = data.firstname;
      this.email = data.email;
      this.lastLoginDate = data.lastLoginDate;
      this.password = data.password;
      this.token = data.token;
      this.conect = data.conect;
      this.admin = data.admin;
    }
  }
}


