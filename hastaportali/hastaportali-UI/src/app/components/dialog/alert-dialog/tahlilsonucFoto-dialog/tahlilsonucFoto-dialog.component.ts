import { Component, Inject, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { Doktorlar } from 'src/app/moduls/Doktorlar';
import {FormControl} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { TahlilSonuc } from 'src/app/moduls/TahlilSonuc';


@Component({
  selector: 'app-tahlilsonucFoto-dialog',
  templateUrl: './tahlilsonucFoto-dialog.component.html',
  styleUrls: ['./tahlilsonucFoto-dialog.component.scss']
})
export class TahlilsonucFotoDialogComponent implements OnInit {
  
  myControl = new FormControl();
  myControl2 = new FormControl(); 
  doktorlar:Doktorlar[];
  hastalar:hastakayit[];
  

  DoktorAdSoyad:string;
  dialogbaslik:string;

  dialogislem:string;

  frm:FormGroup;

  yenikayit:TahlilSonuc;

  TahlilSonucId:string;

  constructor(
    public apiservice:ApiService,

    public MatDialog:MatDialog,

    public frmBuild:FormBuilder,

    public matDialogRef:MatDialogRef<TahlilsonucFotoDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data:any,
  ){ 
    this.dialogislem = data.islem;
    this.yenikayit = data.kayit; 
 
    
    
    if (this.dialogislem=='ekle'){
      this.dialogbaslik="tahlil sonuc ekle";
    }
    if (this.dialogislem=='duzenle'){
      this.dialogbaslik="tahlil sonuc duzenle";
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
    TahlilSonuc1: [this.yenikayit.TahlilSonuc1],
 });
  }



}
