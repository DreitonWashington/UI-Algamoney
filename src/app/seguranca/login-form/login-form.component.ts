import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { __values } from 'tslib';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  log = {
    email:'',
    password:''
  }

  constructor(
    private auth: AuthService, private error:ErrorHandlerService, private router: Router
  ) { }


  ngOnInit(): void {
  }

  login(email:String, password:String){
    this.auth.login(email,password)
      .then(() => {
        this.router.navigate(['/lancamentos'])
      })
      .catch(erro=>{
        this.error.handle(erro);
      })
  }
}
