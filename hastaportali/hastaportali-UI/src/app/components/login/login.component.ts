import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { sonuc } from 'src/app/moduls/sonuc';

import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';
import { ConfirmDialogComponent } from '../dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public alert:MyalertserviceService,

    public ApiService:ApiService,

  ) { }

  ngOnInit() {  }

  oturumac(kimlik:string,sifre:string){
    this.ApiService.tokenal(kimlik,sifre).subscribe((d:any)=>{

      localStorage.setItem("token",d.access_token);
      localStorage.setItem("kimlik",d.DoktorKimlik);
      localStorage.setItem("adsoyad",d.DoktorAdSoyad);
      localStorage.setItem("doktoryetkileri",d.doktoryetkileri);
      location.href="/hesabim";
     
    },err=>{
      var s: sonuc =new sonuc();
      s.islem=false;
      s.mesaj=" kimliginiz ya da sifreniz hatalidir"
      this.alert.alertuygula(s);
    
    });
  }


}
