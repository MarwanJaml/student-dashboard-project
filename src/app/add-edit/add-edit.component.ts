import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddUsersService } from './add-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})

export class AddEditComponent {
  
  userId: string ='u1';
  enteredName= '';
  enteredPhone = '';
  enteredEmail= '';
  enteredGender= '';
  isEditMode = false;
  studentId = null;
  constructor(private router: Router, private addUsersService: AddUsersService) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.student) {
      this.isEditMode = true;
      const student = state.student;
      this.studentId = student.id;
      this.enteredName = student.s_name;
      this.enteredPhone = student.s_phone;
      this.enteredEmail = student.s_email;
      this.enteredGender = student.s_gender;
    }
  }

  saveStudent() {
    if (this.isEditMode && this.studentId) {
      this.addUsersService.updateStudent(this.studentId, {
        name: this.enteredName,
        phone: this.enteredPhone,
        email: this.enteredEmail,
        gender: this.enteredGender,
      });
    } else {
      this.addUsersService.addStudent(
        {
          name: this.enteredName,
          phone: this.enteredPhone,
          email: this.enteredEmail,
          gender: this.enteredGender,
        },
        'u1'
      );
    }
    this.router.navigate(['/home']);
  }
}
