import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ''
  password: string = ''

  constructor(private userService: AuthService, private router: Router){

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.userService.login(this.username, this.password).subscribe(data => {
      alert('Signed in successfully')
      this.router.navigateByUrl('/')
    })
  }

}
