import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  signupForm: any = FormGroup;
  signinForm: any = FormGroup;
  otpForm: any = FormGroup;
  signIn: boolean = false;
  contactError: boolean = false;
  check: boolean = true;
  contactLength: any;
  password: any;
  Cpassword: any;
  differentPassword: boolean = false;
  numberSubmit: boolean = false;
  invalidOtp: boolean = true;

  user: any;
  loggedIn: any;
  emailLogin: boolean = true;
  constructor(private fb: FormBuilder, 
    private router: Router,
     private _as: AuthService,
      private authService: SocialAuthService,
      private _socketService:SocketService
      ) { }


  googleLogin() {
    // console.log("Hello from login function ");
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log("Checking data of the user", this.user);
      localStorage.setItem('logged_in', 'true')
      // this.router.navigate(['/dashboard']);
      
      if(this.loggedIn){
        let params = {
          email : this.user.email
        };
            this._as.signIn('/signIn', params).subscribe((next: any) => {
          // console.log(next);
          if (next && !next.error) {
            this.numberSubmit = true;
            this._as.obNotify({
              start: true,
              code: 200,
              status: 'success',
              message: next.message
            })
          }
          else {
            this.numberSubmit = false;
            this._as.obNotify({
              start: true,
              code: 200,
              status: 'error',
              message: next.message
            })
          }
        })
      }
    });
  }
  ngOnInit(): void {
    this._socketService.SocketConnection();
    this.googleLogin();
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contact: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(14)])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      checkbox: ['', Validators.required]
    })
    if (this.emailLogin) {
      this.signinForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])]
      })
    }
    else {
      this.signinForm = this.fb.group({
        contact: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(14)])]
      })
    }
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    })
  }
  Signin() {
    // this._as.obNotify({
    //   start:true,
    //   code:200,
    //   status:'success',
    //   message:'Logged Out'
    // })
    // console.log("SIgn in",this.signupForm);
    this.signIn = !this.signIn;
    this.numberSubmit = false;
    var cards = document.querySelectorAll('.box');
    // var card = document.getElementsByClassName('box').firstElementChild.classList.toggle('is-flipped');

    [...cards as any].forEach((card) => {
      card.classList.toggle('is-flipped');
    });

  }

  Submit() {
    console.log("Submitted");
    if (this.signIn) {
      let params = {};
      if (this.emailLogin) {
        params = {
          email: this.signinForm.value.email
        }
      }
      else {
        params = {
          contact: this.signinForm.value.contact
        }
      }
      // console.log(params);

      this._as.signIn('/signIn', params).subscribe((next: any) => {
        // console.log(next);
        if (next && !next.error) {
          this.numberSubmit = true;
          localStorage.setItem('user-email',params['email'])
          this._as.obNotify({
            start: true,
            code: 200,
            status: 'success',
            message: next.message
          })
        }
        else {
          this.numberSubmit = false;
          this._as.obNotify({
            start: true,
            code: 200,
            status: 'error',
            message: next.message
          })
        }
      })
    }
    else {
      this.numberSubmit = true;
      const params = this.signupForm.value;
      this._as.signUp('/signup', params).subscribe((next: any) => {
        // console.log(next);

      })
    }
    this.signinForm.reset();
    this.signinForm.reset();
  }

  contactInput(e: any) {
    // console.log(e);
    if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8)) {
      this.contactLength ? this.contactLength.length > 13 || this.contactLength.length < 6 ? this.contactError = true : this.contactError = false : this.contactError = false
      this.contactLength ? this.contactLength.length > 13 ? e.keyCode !== 8 ? e.preventDefault() : '' : '' : ''
    }
    else {
      // console.log("Invalid key pressed");
      e.preventDefault();
      this.contactError = true;
    }
  }
  contactLengthChecker(e: any) {
    this.contactLength = e.target.value;
  }



  // Function to check the password and confirm password 
  confirmPasswordInput(e: any) {
    console.log(e.target.value);
    this.password = e.target.value;
    if (e.target.value !== this.Cpassword) {
      // console.log("if block in c password");

      this.differentPassword = true
    }
    else {
      // console.log("else block c password");

      this.differentPassword = false
    }
    console.log(this.differentPassword);


  }
  passwordInput(e: any) {
    console.log(e.target.value);
    this.Cpassword = e.target.value;
    if (e.target.value !== this.password) {
      // console.log("If block in password");

      this.differentPassword = true
    }
    else {
      // console.log("else block password");

      this.differentPassword = false
    }
    // console.log(this.differentPassword);

  }
  onOtpChange(e: any) {
    // console.log(e,typeof e,e*0);

    if (e.length > 3) {
      const params = {
        otp: e,
        email : localStorage.getItem('user-email')
      }
      console.log(params);

      this._as.otpChecker('/otpChecker', params).subscribe((next: any) => {
        // console.log(next);
        this.invalidOtp = false;
        // console.log("OTP submitted successfully");
        setTimeout(() => {
          this.Signin()
          this.numberSubmit = false;
          this.router.navigate(['/dashboard']);
        }, 2000);
      })
    }
    else {
      this.invalidOtp = true;
    }
  }

  keyValue(e: any) {
    // console.log(e);
    if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8)) {
      // DO NOTHING 
    }
    else {
      e.preventDefault();
    }
  }
}

// $(document).on("click", ".parent", function () {
// 	$(this).toggleClass('hover');
// });


