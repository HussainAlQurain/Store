import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  first_name: string = ''
  last_name: string = ''
  email: string = ''
  username: string = ''
  password_digest: string = ''
  constructor(private userService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let user: User = {first_name: this.first_name, last_name: this.last_name, username: this.username, password_digest: this.password_digest, email: this.email}
    this.userService.createUser(user).subscribe(data => {
      localStorage.setItem('token', JSON.stringify(data));
      alert('Registered Successfully')
      this.router.navigateByUrl('/')
    })
    
  }
}
