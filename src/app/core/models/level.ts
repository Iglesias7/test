
export class Level {
  id!: number;
  title!: string;
  uaas!: any[];

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.uaas = data.uaas;
    }
  }
}


