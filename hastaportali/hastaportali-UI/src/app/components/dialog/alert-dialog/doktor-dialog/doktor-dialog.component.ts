import { Component, Inject, OnInit,} from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';

import { Doktorlar } from 'src/app/moduls/Doktorlar';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { Randevu } from 'src/app/moduls/Randevu';
import { TipDallari } from 'src/app/moduls/TipDallari';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-doktor-dialog',
  templateUrl: './doktor-dialog.component.html',
  styleUrls: ['./doktor-dialog.component.scss']
})
export class DoktorDialogComponent implements OnInit {

  myControl = new FormControl();
  
  dialogbaslik:string;

  dialogislem:string;

  frm:FormGroup;

  yenikayit:Doktorlar;

  hastalar:hastakayit[];

  Doktorlar:Doktorlar[];

  TipDallari:TipDallari[];

  Randevu:Randevu[];

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<DoktorDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,


  ) { 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit;

    if (this.dialogislem=='ekle'){
      this.dialogbaslik="doktor ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="doktor duzenle";
    }
    this.frm=this.formOlustur(); 
    this.hastalarlistele();
    this.tipdalilistele();
    this.randevulistele();
    this.doktorlistele();
  }

  ngOnInit() {
  }

  hastalarlistele(){
    this.apiservice.hastakayitliste().subscribe((d:hastakayit[])=>{
      this.hastalar=d;

    })
  }
  tipdalilistele(){
    this.apiservice.Tipdallariliste().subscribe((d:TipDallari[])=>{
      this.TipDallari=d;

    })
  }
  randevulistele(){
    this.apiservice.Randevuliste().subscribe((d:Randevu[])=>{
      this.Randevu=d;

    })
  }

  doktorlistele(){
    this.apiservice.Doktorlarliste().subscribe((d:Doktorlar[])=>{
      this.Doktorlar=d;


    })
  }

  formOlustur(){
    return this.frmBuild.group({
      DoktorKimlik:[this.yenikayit.DoktorKimlik],
      DoktorAdSoyad:[this.yenikayit.DoktorAdSoyad],
      DoktorTel:[this.yenikayit.DoktorTel],
      DoktorE_mail:[this.yenikayit.DoktorE_mail],
      DoktorFoto:[this.yenikayit.DoktorFoto],
      DoktorSifre:[this.yenikayit.DoktorSifre],
      TedaviAlanlarKimlik:[this.yenikayit.TedaviAlanlarKimlik],
      DoktorTipDaliId:[this.yenikayit.DoktorTipDaliId],
      randevular:[this.yenikayit.randevular],
 
    });
  }

}
