import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import {ShoolService} from "../../core/services/shool.service";
import {Shool} from "../../core/models/shool";
import {StudentService} from "../../core/services/student.service";
import {Student} from "../../core/models/student";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent implements OnInit {
  students!: Student[];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.studentService.findAll().subscribe(students => {
      this.students = students;
    })
  }
}
