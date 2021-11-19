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
    let body = {
      username: this.username,
      password: this.password,
      aksi: 'register'
    };
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      if(data.success) {
        this.router.navigate(['/login']);
        const toast = await this.toastCtrl.create({
          message: "",
          duration: 2000
        });
        toast.present();
      }
      else {

      }
    })
  }

}
