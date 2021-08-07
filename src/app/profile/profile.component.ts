import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GENDER, IProfile } from '../app.constant';
import { ProfileService } from './core/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: IProfile | undefined;
  public gender = GENDER;
  public form: FormGroup;
  constructor(private profileService: ProfileService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.profileService.getProfileDetails().subscribe((res: IProfile) => {
      this.profile = res;
      this.setFieldValue('name', res.name);
      this.setFieldValue('email', res.email);
      this.setFieldValue('gender', res.gender);
    }, err => alert('Error While retriving the profile.'));
  }

  update(): void {
    if (this.form.valid) {
      const body = {
        username: this.profile?.username,
        name: this.getFiledValue('name'),
        email: this.getFiledValue('email'),
        gender: this.getFiledValue('gender')
      } as IProfile;
      this.profileService.updateProfile(body).subscribe(res => console.log('e:', res));
    }
  }

  getFiledValue(field: string): any {
    return this.form.get(field)?.value;
  }

  setFieldValue(field: string, value: any): void {
    this.form.get(field)?.setValue(value);
  }
}
