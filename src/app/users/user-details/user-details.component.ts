import { Component, OnInit } from '@angular/core';
import { IUserDetails, UserDetails } from 'src/app/app.constant';

import { UserService } from '../core/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public newUser: IUserDetails = {} as IUserDetails;
  public users: UserDetails[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getUsers().subscribe((res: UserDetails[]) => {
      this.users = res;
    });
  }

  public addNewUser(): void {
    this.userService.addNewUser(this.newUser).subscribe((res) => {
      this.newUser = {} as IUserDetails;
      this.getAllUsers();
    });
  }

  public deleteUser(user: UserDetails): void {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.getAllUsers();
      alert(`User ${user.username} deleted succesfully.`);
    });
  }

  public cancelEdit(user: UserDetails): void {
    user.editEmail = user.email;
    user.editRole = user.role;
    user.isEdit = false;
  }

  public saveUserDetails(user: UserDetails): void {
    const body = {
      email: user.editEmail,
      role: user.editRole,
      name: user.name,
      username: user.username,
      gender: user.gender
    } as IUserDetails;

    this.userService.updateUserDetails(user.id, body).subscribe(() => {
      this.getAllUsers();
    });
  }

}
