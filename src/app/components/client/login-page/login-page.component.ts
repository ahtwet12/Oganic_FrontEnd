import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_service/auth.service';
import { StorageService } from 'src/app/_service/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [MessageService]

})
export class LoginPageComponent implements OnInit {


  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';

  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null
  }

  constructor(private authService:AuthService,private storageService: StorageService,private messageService:MessageService,private router:Router){}

  ngOnInit(): void {
  }

  login():void{
    const {username,password} = this.loginForm;
    console.log(this.loginForm);
    this.authService.login(username,password).subscribe({
      next: res =>{
        this.storageService.saveUser(res);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storageService.getUser().roles;
        alert("Đăng nhập thành công!!");
        this.router.navigate(['/']);
      },error: err =>{
        console.log(err);
        this.isLoggedIn = false;
        this.isLoginFailed = true;

        if (err.status === 401) {
          this.errorMessage = 'Sai tài khoản hoặc mật khẩu.';
          alert('Sai tài khoản hoặc mật khẩu.');
        } else {
          this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại sau.';
          alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
      }
    })
  }

  register():void{
    const { username, email, password } = this.registerForm;
    this.authService.checkUsernameExists(username).subscribe({
      next: res => {
        if (res) {
          alert('Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.');
          this.isSignUpFailed = true;
        } else {
          this.authService.register(username, email, password).subscribe({
            next: res => {
              this.isSuccessful = true;
              this.isSignUpFailed = false;
              alert("Đăng ký thành công");
              this.clearRegisterForm();
              this.loginFormChange(); // Chuyển đổi về biểu mẫu đăng nhập sau khi đăng ký thành công
            },
            error: err => {
              this.showError(err.message);
              this.errorMessage = err.error.message;
              this.isSignUpFailed = true;
            }
          });
        }
      },
      error: err => {
        this.showError('Có lỗi xảy ra khi kiểm tra tài khoản.');
        console.log(err);
      }
    });
  }

  clearRegisterForm(): void {
    this.registerForm.username = null;
    this.registerForm.email = null;
    this.registerForm.password = null;
  }

  loginFormChange(){
    document.getElementById('container')?.classList.remove("right-panel-active");
  }
  registerFormChange(){
    document.getElementById('container')?.classList.add("right-panel-active");
  }


  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text: string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }

}
