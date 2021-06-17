import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { hastabilgi } from 'src/app/moduls/hastabilgi';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { sonuc } from 'src/app/moduls/sonuc';

import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';
import { ConfirmDialogComponent } from '../../dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { HastabilgiDialogComponent } from '../../dialog/alert-dialog/hastabilgi-dialog/hastabilgi-dialog.component';

@Component({
  selector: 'app-hastabilgilistesi',
  templateUrl: './hastabilgilistesi.component.html',
  styleUrls: ['./hastabilgilistesi.component.scss']
})
export class HastabilgilistesiComponent implements OnInit {

  hastakayitlar:hastakayit[];
  hastabilgiler:hastabilgi[];
  
  secilihasta:hastakayit;
  HastaKimlik:string;
  
  siteurl="https://localhost:44356"
  displayedColumns=['HastaBilgiId','bilgiaitHasta','Yas','Uzunluk','Agarlik','KanGrubu','Tansiyon','Nabiz','SolunumSayisi','Sicaklik','Diyet','Alerji','OlcmeYapanDoktorKimlik','DoktorAdSoyad','OlcmeTarihi'];
  dataSource :any;

  dialogRef:MatDialogRef<HastabilgiDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>; 

  constructor(
    public apiservis:ApiService,
    public alert:MyalertserviceService,
    public router:ActivatedRoute,
    public MatDialog:MatDialog,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(p=>{
      if(p){
      this.HastaKimlik = p.HastaKimlik;
      this.hastagetir();
      this.hastabilgilistelebykimlik(); 
      this.hastabilgiliste();
      }
    });
  }

  hastagetir(){
    this.apiservis.HastaKayitbykimlik(this.HastaKimlik).subscribe((h:hastakayit)=>{
      this.secilihasta=h;
  
    });
  }

  hastabilgilistelebykimlik(){
    this.apiservis.HastaKayitbykimlik1(this.HastaKimlik).subscribe((d:hastakayit[])=>{
      this.hastakayitlar=d;
      this.dataSource=new MatTableDataSource(this.hastakayitlar);
   
    });
  }

  hastabilgiliste(){
    this.apiservis.HastaBilgiliste().subscribe((d:hastabilgi[])=>{
      this.hastabilgiler=d;

    })
  }


  duzenle():void{
    var kayit : hastabilgi;
    this.dialogRef=this.MatDialog.open(HastabilgiDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit, 
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
  
      
        kayit.HastaBilgiId=d.HastaBilgiId;
        kayit.Yas=d.Yas;
        kayit.Uzunluk=d.Uzunluk;
        kayit.Agarlik=d.Agarlik;
        kayit.KanGrubu=d.KanGrubu;
        kayit.Tansiyon=d.Tansiyon;
        kayit.Nabiz=d.Nabiz;
        kayit.Sicaklik = d.Sicaklik;
        kayit.Diyet= d.Diyet;
        kayit.Alerji= d.Alerji;
        kayit.OlcmeTarihi= d.OlcmeTarihi;
        kayit.OlcmeYapanDoktorKimlik= d.OlcmeYapanDoktorKimlik;
        kayit.DoktorAdSoyad= d.DoktorAdSoyad;
        kayit.E_imza= d.E_imza;
  
        this.apiservis.hastabilgiduzenle(kayit).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          this.hastabilgilistelebykimlik();
        });
      }
    })
  }

}
