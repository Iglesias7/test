
export class Uaa {
  id!: number;
  name!: string;
  description!: string;
  level!: any;
  studentUaaList!: any[];

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.level = data.level;
      this.studentUaaList = data.studentUaaList;
    }
  }
}


