import { Component, Inject, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { hastabilgi } from 'src/app/moduls/hastabilgi';
import { hastakayit } from 'src/app/moduls/HastaKayit';

import { TipDallari } from 'src/app/moduls/TipDallari';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kayit-dialog',
  templateUrl: './kayit-dialog.component.html',
  styleUrls: ['./kayit-dialog.component.scss']
})
export class KayitDialogComponent implements OnInit {

  dialogbaslik:string;

  myControl = new FormControl();

  TipDallari:TipDallari[];

  hastabilgi:hastabilgi[];

  hastakayit:hastakayit[];

  dialogislem:string;

  frm:FormGroup;

  yenikayit:hastakayit;

  Hastakimlik:string;

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<KayitDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
  ){ 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit.Hastaveriler; 
 
    
    
    if (this.dialogislem=='ekle'){
      this.dialogbaslik="hasta ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="hasta duzenle";
    }
    this.frm=this.formOlustur();
    this.tipdalilistele();
    this.hastabilgilistele();
    this.hastakayitliste();
  }

  ngOnInit() {
  }

  tipdalilistele(){
    this.apiservice.HastaBilgiliste().subscribe((d:hastabilgi[])=>{
      this.hastabilgi=d;
      

    })
  }

  hastabilgilistele(){
    this.apiservice.Tipdallariliste().subscribe((d:TipDallari[])=>{
      this.TipDallari=d;
      

    })
  }


  hastakayitliste(){
    this.apiservice.hastakayitliste().subscribe((d:hastakayit[])=>{
      this.hastakayit=d;
    })
  }

  formOlustur(){
    return this.frmBuild.group({
      HastaKimlik:[this.yenikayit.HastaKimlik],
      HastaAdSoyad:[this.yenikayit.HastaAdSoyad],
      HastaDogumTarihi:[this.yenikayit.HastaDogumTarihi],
      HastaE_posta:[this.yenikayit.HastaE_posta],
      HastaTelefon:[this.yenikayit.HastaTelefon],
      HastaFoto:[this.yenikayit.HastaFoto],
      HastaSifre:[this.yenikayit.HastaSifre],
      HastaTipDaliId:[this.yenikayit.HastaTipDaliId],
      HastaKayitBilgiId:[this.yenikayit.HastaKayitBilgiId]
      
    });
  }
}
