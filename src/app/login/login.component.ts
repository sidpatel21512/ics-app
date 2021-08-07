import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public password: string = '';
  public showInvalidCredentialsError = false;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  submit() {
    if (this.form.valid) {
      this.authService.verifyLogin(this.getFormFieldValue('username'), this.getFormFieldValue('password')).subscribe((res: boolean) => {
        if (res) {
          this.router.navigate(['profile']);
        } else {
          this.showInvalidCredentialsError = true;
        }
      }, error => {
        alert('Error while login, Please try again later');
      });
    }
  }

  getFormFieldValue(fieldName: string): any {
    return this.form.get(fieldName)?.value ?? '';
  }
}
