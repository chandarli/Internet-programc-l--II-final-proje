import { Component, Inject, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { Doktorlar } from 'src/app/moduls/Doktorlar';
import {FormControl} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { TipDallari } from 'src/app/moduls/TipDallari';


@Component({
  selector: 'app-tipdali-dialog',
  templateUrl: './tipdali-dialog.component.html',
  styleUrls: ['./tipdali-dialog.component.scss']
})
export class TipdaliDialogComponent implements OnInit {

  myControl = new FormControl();
  myControl2 = new FormControl(); 

  doktorlar:Doktorlar[];
  hastalar:hastakayit[];


  DoktorAdSoyad:string;
  dialogbaslik:string;

  dialogislem:string;

  frm:FormGroup;

  yenikayit:TipDallari;

  TipDaliId:string;

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<TipdaliDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
  ){ 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit; 

    
    
    if (this.dialogislem=='ekle'){
      this.dialogbaslik="tip dali ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="tip dali duzenle";
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

      TipDaliId: [this.yenikayit.TipDaliId],
      TipDali: [this.yenikayit.TipDali],
      TipDalihastakayit: [this.yenikayit.TipDalihastakayit],
      TipDaliDoktor: [this.yenikayit.TipDaliDoktor],

    });
  }



}
