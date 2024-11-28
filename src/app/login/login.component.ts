import { Component, signal, inject, DestroyRef, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}


@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit{
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email : new FormControl(initialEmailValue,{
      validators: [Validators.email, Validators.required]
    }),
    password : new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(6),
      ]

    }),
  });
  get emailIsInvalid(){
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid 

    );
  }
  get passwordIsInvalid(){
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid 

    );
  }
  ngOnInit(){
    const subscription = this.form.valueChanges
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email })
          );
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }

  constructor(private router: Router) {}
  login() {
    this.router.navigate(['/home']);
  }
}
