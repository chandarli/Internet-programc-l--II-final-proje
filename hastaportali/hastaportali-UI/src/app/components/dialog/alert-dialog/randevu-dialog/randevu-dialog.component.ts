import { Component, Inject, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { Doktorlar } from 'src/app/moduls/Doktorlar';
import {FormControl} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { Randevu } from 'src/app/moduls/Randevu';
import { TipDallari } from 'src/app/moduls/TipDallari';

@Component({
  selector: 'app-randevu-dialog',
  templateUrl: './randevu-dialog.component.html',
  styleUrls: ['./randevu-dialog.component.scss']
})
export class RandevuDialogComponent implements OnInit {

  myControl = new FormControl();
  myControl2 = new FormControl(); 
  doktorlar:Doktorlar[];
  hastalar:hastakayit[];
  tipdallar:TipDallari[];

  DoktorAdSoyad:string;
  dialogbaslik:string;

  dialogislem:string;

  frm:FormGroup;

  yenikayit:Randevu;

  RandevuId:string;

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<RandevuDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
  ){ 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit; 
    console.log(this.yenikayit);
    
    
    if (this.dialogislem=='ekle'){
      this.dialogbaslik="randevu ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="randevu duzenle";
    }
    this.frm=this.formOlustur();
    this.doktorlarlistele();
    this.hastalarlistele();
    this.tipdalilistelelistele();
  }

  ngOnInit() {
  }

  doktorlarlistele(){
    this.apiservice.Doktorlarliste().subscribe((d:Doktorlar[])=>{
      this.doktorlar=d;
      
      console.log(this.doktorlar);
    })
  }

  hastalarlistele(){
    this.apiservice.hastakayitliste().subscribe((d:hastakayit[])=>{
      this.hastalar=d;
      
      console.log(this.hastalar);
    })
  }

  tipdalilistelelistele(){
    this.apiservice.Tipdallariliste().subscribe((d:TipDallari[])=>{
      this.tipdallar=d;
      
      console.log(this.tipdallar);
    })
  }

  formOlustur(){
    return this.frmBuild.group({

      RandevuId: [this.yenikayit.RandevuId],
      RandevuSaati: [this.yenikayit.RandevuSaati],
      RandevuTarihi: [this.yenikayit.RandevuTarihi],
      RandevuTipDaliId: [this.yenikayit.RandevuTipDaliId],
      RandevuDoktorKimlik: [this.yenikayit.RandevuDoktorKimlik],
      Randevuhastakayit: [this.yenikayit.Randevuhastakayit],

    });
  }



}
