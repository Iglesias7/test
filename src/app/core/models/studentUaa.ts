
export class StudentUaa {
  id!: number;
  note!: number;
  secondNote!: number;
  student!: any;
  uaa!: any;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.note = data.note;
      this.secondNote = data.secondNote;
      this.student = data.student;
      this.uaa = data.uaa;
    }
  }
}


