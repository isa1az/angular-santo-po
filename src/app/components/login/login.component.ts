import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user?: string = "miri";
  password?: string = "123456";
  errorMessage?: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    try {
      this.auth.login({user: this.user, password: this.password});
    } catch(error) {
      console.error(error);
    }
  }
}