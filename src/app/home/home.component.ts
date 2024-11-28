import { Component,EventEmitter,signal, Input, inject, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddUsersService } from '../add-edit/add-users.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

  export class HomeComponent implements OnInit {
  students: any[] = [];
  userId: string = 'u1' ;
  filteredStudents: any[] = [];
  searchQuery: string = '';
  paginatedStudents: any[] = []; 


  currentPage: number = 1;
  pageSize: number = 3; 
  totalPages: number = 0;


  constructor(
    private router: Router,
    private addUsersService: AddUsersService
  ) {}

  ngOnInit() {
    this.loadStudents();

    this.router.events.subscribe(() => {
      this.loadStudents();
    });
  }

  loadStudents() {
    this.students = this.addUsersService.getStudent(this.userId);
    this.filteredStudents = this.students;
    this.updatePagination();
    console.log('Updated students:', this.students);
    console.log('Students in HomeComponent:', this.students);
  }

  filterStudents() {
    const query = this.searchQuery.toLowerCase();
    this.filteredStudents = this.students.filter(
      (student) =>
        student.s_name.toLowerCase().includes(query) ||
        student.s_phone.toLowerCase().includes(query) ||
        student.s_email.toLowerCase().includes(query) ||
        student.s_gender.toLowerCase().includes(query)
    );
    this.updatePagination();
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.pageSize);
    this.paginatedStudents = this.filteredStudents.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

   deleteStudent(studentId: string) {
    this.addUsersService.deleteStudent(studentId);
    this.loadStudents(); 
  }
  editStudent(student: any) {
    console.log('Navigating to edit:', student);
    this.router.navigate(['/add-edit'], { state: { student } });
  }

  navigateToAddEdit() {
    this.router.navigate(['/add-edit']);
  }
  logout(){
    this.router.navigate(['/login']);
  }









}