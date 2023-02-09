import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  signupForm:any = FormGroup;
  signinForm:any = FormGroup;
  otpForm:any = FormGroup;
  signIn:boolean = false;
  contactError:boolean = false;
  check:boolean = true;
  contactLength:any;
  password:any;
  Cpassword:any;
  differentPassword:boolean = false;
  numberSubmit:boolean = false;
  invalidOtp:boolean = true;
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email:['',Validators.compose([Validators.required, Validators.email])],
      contact:['',Validators.compose([Validators.required, Validators.minLength(7),Validators.maxLength(14)])],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
      checkbox:['',Validators.required]
    })
    this.signinForm = this.fb.group({
      contact:['',Validators.compose([Validators.required, Validators.minLength(7),Validators.maxLength(14)])]
    })
    this.otpForm = this.fb.group({
      otp:['',Validators.required]
    })
  }
  Signin(){
    // console.log("SIgn in",this.signupForm);
    this.signIn = !this.signIn;
    
    var cards = document.querySelectorAll('.box') ;
    // var card = document.getElementsByClassName('box').firstElementChild.classList.toggle('is-flipped');

[...cards as any].forEach((card)=>{
    card.classList.toggle('is-flipped');
  });

  }

  Submit(){
    console.log("Submitted");
    this.signIn ? this.numberSubmit = true : this.numberSubmit = false;
    this.signinForm.reset();
    this.signinForm.reset();
  }

  contactInput(e:any){
    // console.log(e);
    if(((e.keyCode>=96 && e.keyCode<=105) || (e.keyCode>=48 && e.keyCode<=57) || e.keyCode===8)){
      this.contactLength ?  this.contactLength.length>13 || this.contactLength.length<6 ? this.contactError = true : this.contactError = false : this.contactError = false
      this.contactLength ? this.contactLength.length>13 ? e.keyCode !==8 ? e.preventDefault() : '' : '' : ''
    }
    else{
      // console.log("Invalid key pressed");
      e.preventDefault();
      this.contactError = true; 
    }
  }
  contactLengthChecker(e:any){
    this.contactLength = e.target.value;
  }



  // Function to check the password and confirm password 
  confirmPasswordInput(e:any){
    console.log(e.target.value);
    this.password = e.target.value;
    if(e.target.value !== this.Cpassword){
      console.log("if block in c password");
      
      this.differentPassword = true
    }
    else{
      console.log("else block c password");
      
      this.differentPassword = false
    }
    console.log(this.differentPassword);
    
    
  }
  passwordInput(e:any){
    console.log(e.target.value);
    this.Cpassword = e.target.value;
    if(e.target.value !== this.password){
      console.log("If block in password");
      
      this.differentPassword = true
    }
    else{
      console.log("else block password");
      
      this.differentPassword = false
    }
    console.log(this.differentPassword);
    
  }
  onOtpChange(e:any){
    // console.log(e,typeof e,e*0);
  
    if(e.length>3){
      this.invalidOtp = false;
      console.log("OTP submitted successfully");
      setTimeout(() => {
        this.Signin()
        this.numberSubmit = false;
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
    else{
      this.invalidOtp = true;
  }
  }

  keyValue(e:any){
    console.log(e);
    if(((e.keyCode>=96 && e.keyCode<=105) || (e.keyCode>=48 && e.keyCode<=57) || e.keyCode===8)){
      // DO NOTHING 
    }
    else{
      e.preventDefault();
    }
  }
}

// $(document).on("click", ".parent", function () {
// 	$(this).toggleClass('hover');
// });


