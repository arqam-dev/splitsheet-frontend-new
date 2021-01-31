import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../views/service/Auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})

export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private auth:AuthService,
    private router:Router){}

  logout()
  {
    // console.log('logout func called');
    this.auth.logout();
    this.router.navigate(['/login']);
  }  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
