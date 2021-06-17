import { Component, Inject, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { Doktorlar } from 'src/app/moduls/Doktorlar';

import {FormControl} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { Recete } from 'src/app/moduls/Recete';

@Component({
  selector: 'app-recete-dialog',
  templateUrl: './recete-dialog.component.html',
  styleUrls: ['./recete-dialog.component.scss']
})
export class ReceteDialogComponent implements OnInit {

  myControl = new FormControl();
  myControl2 = new FormControl(); 
  doktorlar:Doktorlar[];
  hastalar:hastakayit[];

  DoktorAdSoyad:string;
  dialogbaslik:string;

  dialogislem:string;

  frm:FormGroup;

  yenikayit:Recete;

  ReceteId:string;

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<ReceteDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
  ){ 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit; 

    
    
    if (this.dialogislem=='ekle'){
      this.dialogbaslik="recete ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="recete duzenle";
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
      
 ;
    })
  }

  hastalarlistele(){
    this.apiservice.hastakayitliste().subscribe((d:hastakayit[])=>{
      this.hastalar=d;
      

    })
  }

  formOlustur(){
    return this.frmBuild.group({

      ReceteId: [this.yenikayit.ReceteId],
      IlacAdi: [this.yenikayit.IlacAdi],
      Miktarlar: [this.yenikayit.Miktarlar],
      Doz: [this.yenikayit.Doz],
      Sure: [this.yenikayit.Sure],
      ReceteTarih: [this.yenikayit.ReceteTarih],
      Recetehastakayit: [this.yenikayit.Recetehastakayit],
      Recetedoktorkimlik:[this.yenikayit.Recetedoktorkimlik],
      
    });
  }



}
