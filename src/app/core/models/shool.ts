
export class Shool {
  id!: number;
  name!: string;
  logo!: string;
  levels!: any[];

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.logo = data.logo;
      this.levels = data.levels;
    }
  }
}


