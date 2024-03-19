import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  error: string = null;

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signUp(email, password).subscribe(
      resData => {
        console.log(resData);
      },
      errorMessage => {
        this.error = errorMessage;
      }
    );

    form.reset();
  }

}
