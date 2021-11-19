import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/post-provider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  confirm_password: string = "";

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  formLogin() {
    this.router.navigate(['/login']);
  }

  async prosesRegister() {

    if(this.username == ""){
      const toast = await this.toastCtrl.create({
        message: 'Username is required',
        duration: 2000
      });
      toast.present();
    }
    else if(this.password == ""){
      const toast = await this.toastCtrl.create({
        message: 'Password is required',
        duration: 2000
      });
      toast.present();
    }
    else if(this.password != this.confirm_password){
      const toast = await this.toastCtrl.create({
        message: 'Invalid Password',
        duration: 2000
      });
      toast.present();
    }
    else{
      let body = {
        username: this.username,
        password: this.password,
        aksi: 'register'
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
        var alertmsg = data.msg;
        if(data.success) {
          this.router.navigate(['/login']);
          const toast = await this.toastCtrl.create({
            message: 'Register Successful',
            duration: 2000
          });
          toast.present();
        }
        else {
          const toast = await this.toastCtrl.create({
            message: alertmsg,
            duration: 2000
          });
          toast.present();
        }
      });
    }
  }

}
