import { Injectable, signal } from '@angular/core';
import { type NewStudent } from '../student-input.model';

@Injectable({ providedIn: 'root' })
export class AddUsersService {
  private students = [
    {
      id: 's1',
      userId: 'u1',
      s_name: 'Marwan',
      s_phone: '0792824184',
      s_email:
        'marwanaljaml11@gmail.com',
      s_gender: 'Male',
    },
    {
      id: 's2',
      userId: 'u2',
      s_name: 'Hasan',
      s_phone: '0792822586',
      s_email:
        'marwanaljaml1@gmail.com',
      s_gender: 'Male',
    },

  ];

  addStudent(studentData: NewStudent, userId: string) {
    this.students.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      s_name: studentData.name,
      s_phone: studentData.phone,
      s_email: studentData.email,
      s_gender: studentData.gender,

    });
  }
  updateStudent(studentId: string, updatedData: any) {
    const studentIndex = this.students.findIndex((student) => student.id === studentId);
    if (studentIndex !== -1) {
      this.students[studentIndex] = {
        ...this.students[studentIndex],
        s_name: updatedData.name,
        s_phone: updatedData.phone,
        s_email: updatedData.email,
        s_gender: updatedData.gender,
      };
    }
  }
 

  getStudent(userId: string) {
    return this.students.filter((student) => student.userId === userId);
  }
  deleteStudent(studentId: string) {
    this.students = this.students.filter((student) => student.id !== studentId);
  }

}