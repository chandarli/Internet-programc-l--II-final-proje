import { Component, Inject, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { hastabilgi } from 'src/app/moduls/hastabilgi';

import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-hastabilgi-dialog',
  templateUrl: './hastabilgi-dialog.component.html',
  styleUrls: ['./hastabilgi-dialog.component.scss']
})
export class HastabilgiDialogComponent implements OnInit {

  dialogbaslik:string;

  dialogislem:string;

  frm:FormGroup;

  yenikayit:hastabilgi;

  HastaBilgiId:string;

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<HastabilgiDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
  ){ 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit.HastaBilgiler; 

    
    
    if (this.dialogislem=='ekle'){
      this.dialogbaslik="hasta ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="hasta duzenle";
    }
    this.frm=this.formOlustur();
  }

  ngOnInit() {
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
      
    });
  }
}
