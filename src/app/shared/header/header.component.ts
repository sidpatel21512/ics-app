import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/app.constant';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() public activelink: string | undefined;

  public role: ROLE;
  constructor(private router: Router, private auth: AuthService) {
    this.role = auth.role;
  }

  navigateToUrl(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    this.auth.clearStorage();
    this.navigateToUrl('login');
  }
}
