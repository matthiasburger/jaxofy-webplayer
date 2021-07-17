import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoginRequestDto} from '../../interfaces/api-dto/login/login-request-dto';
import {LoginViewModel} from '../../models/login/LoginViewModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private readonly router: Router) {
  }

  model: LoginViewModel = new LoginViewModel();

  ngOnInit(): void {
  }

  login(): void {
    if (!this.model.isValid())
      return;

    const loginRequestModel: LoginRequestDto = {
      username: this.model.username ?? '',
      password: this.model.password ?? ''
    };

    this.authService.login(loginRequestModel).subscribe(
      ext => {
        this.router.navigate(['/home']);
      }, error => {
        console.log(error);
      }
    );

    /*
    this.authService.login(this.model).subscribe(next => {
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
    */
  }

  loggedIn = () => this.authService.loggedIn();
}
