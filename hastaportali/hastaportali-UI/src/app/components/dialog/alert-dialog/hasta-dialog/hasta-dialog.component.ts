import { Component, Inject, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { Doktorlar } from 'src/app/moduls/Doktorlar';
import { hastabilgi } from 'src/app/moduls/hastabilgi';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { TipDallari } from 'src/app/moduls/TipDallari';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hasta-dialog',
  templateUrl: './hasta-dialog.component.html',
  styleUrls: ['./hasta-dialog.component.scss']
})
export class HastaDialogComponent implements OnInit {

  dialogbaslik:string;

  dialogislem:string;

  hastabilgi:hastabilgi[];

  TipDallari:TipDallari[];

  Doktorlar:Doktorlar[];

  hastakayit:hastakayit[];

  myControl = new FormControl();

  frm:FormGroup;

  yenikayit:hastakayit;

  Hastakimlik:string;

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<HastaDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
  ){ 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit; 

    
    
    if (this.dialogislem=='ekle'){
      this.dialogbaslik="hasta ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="hasta duzenle";
    }
    this.frm=this.formOlustur();
    this.tipdalilistele();
    this.hastabilgilistele();
    this.doktorlistele();
    this.hastalistele();
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
  
  doktorlistele(){
    this.apiservice.Doktorlarliste().subscribe((d:Doktorlar[])=>{
      this.Doktorlar=d;

    })
  }

  hastalistele(){
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
      HastaKayitBilgiId:[this.yenikayit.HastaKayitBilgiId],
      TedaviYapanDoktorKimlik:[this.yenikayit.TedaviYapanDoktorKimlik]
      
      
    });
  }
}
