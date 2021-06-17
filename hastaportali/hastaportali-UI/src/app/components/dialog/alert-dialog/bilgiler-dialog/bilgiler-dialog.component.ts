import { Component, Inject, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { Doktorlar } from 'src/app/moduls/Doktorlar';
import { hastabilgi } from 'src/app/moduls/hastabilgi';
import {FormControl} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { hastakayit } from 'src/app/moduls/HastaKayit';

@Component({
  selector: 'app-bilgiler-dialog',
  templateUrl: './bilgiler-dialog.component.html',
  styleUrls: ['./bilgiler-dialog.component.scss']
})
export class BilgilerDialogComponent implements OnInit {
  myControl = new FormControl();
  myControl2 = new FormControl();
  doktorlar:Doktorlar[];
  hastalar:hastakayit[];

  DoktorAdSoyad:string;
  dialogbaslik:string;

  dialogislem:string;

  frm:FormGroup;

  yenikayit:hastabilgi;

  HastaBilgiId:string;

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<BilgilerDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
  ){ 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit; 
    console.log(this.yenikayit);
    
    
    if (this.dialogislem=='ekle'){
      this.dialogbaslik="hasta ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="hasta duzenle";
    }
    this.frm=this.formOlustur();
    this.doktorlarlistele();
    this.hastalarlistele();
  }

  ngOnInit() {
  }

  doktorlarlistele(){
    this.apiservice.Doktorlarliste().subscribe((d:Doktorlar[])=>{
      this.doktorlar=d;
    })
  }

  hastalarlistele(){
    this.apiservice.hastakayitliste().subscribe((d:hastakayit[])=>{
      this.hastalar=d;
    })
  }

  formOlustur(){
    return this.frmBuild.group({

      HastaBilgiId: [this.yenikayit.HastaBilgiId],
      Yas: [this.yenikayit.Yas],
      Uzunluk: [this.yenikayit.Uzunluk],
      Agarlik: [this.yenikayit.Agarlik],
      KanGrubu: [this.yenikayit.KanGrubu],
      Tansiyon: [this.yenikayit.Tansiyon],
      Nabiz: [this.yenikayit.Nabiz],
      SolunumSayisi: [this.yenikayit.SolunumSayisi],
      Sicaklik: [this.yenikayit.Sicaklik],
      Diyet: [this.yenikayit.Diyet],
      Alerji: [this.yenikayit.Alerji],
      OlcmeTarihi: [this.yenikayit.OlcmeTarihi],
      OlcmeYapanDoktorKimlik: [this.yenikayit.OlcmeYapanDoktorKimlik],
      DoktorAdSoyad: [this.yenikayit.DoktorAdSoyad],
      E_imza: [this.yenikayit.E_imza],
      bilgiaitHastaKimlik:[this.yenikayit.bilgiaitHastaKimlik],
      
    });
  }



}
