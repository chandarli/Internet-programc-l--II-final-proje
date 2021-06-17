import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';


import { hastabilgi } from 'src/app/moduls/hastabilgi';

import { sonuc } from 'src/app/moduls/sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';
import { BilgilerDialogComponent } from '../../dialog/alert-dialog/bilgiler-dialog/bilgiler-dialog.component';




@Component({
  selector: 'app-hastabilgiler',
  templateUrl: './hastabilgiler.component.html',
  styleUrls: ['./hastabilgiler.component.scss']
})
export class HastabilgilerComponent implements OnInit {


  hastabilgiler : hastabilgi[];
  displayedColumns=['HastaBilgiId','bilgiaitHasta','Yas','Uzunluk','Agarlik','KanGrubu','Tansiyon','Nabiz','SolunumSayisi','Sicaklik','Diyet','Alerji','OlcmeTarihi','DoktorAdSoyad','islemler'];
  dataSource:any;
  
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) Paginator:MatPaginator;
  
  dialogRef:MatDialogRef<BilgilerDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  
    constructor(
      public apiservice: ApiService,
      public MatDialog:MatDialog,
      public alert:MyalertserviceService,
    ) { }
  
    ngOnInit() { 
      this.hastabilgilerlistele();

    }
  
    hastabilgilerlistele(){
    this.apiservice.HastaBilgiliste().subscribe((d:hastabilgi[])=>{
      this.hastabilgiler=d;
    
  
      
      this.dataSource= new MatTableDataSource(this.hastabilgiler);
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.Paginator; 
  
    })
  }


  
  filtrele(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }
  
  ekle(){
    var yenikayit:hastabilgi=new hastabilgi();
    this.dialogRef=this.MatDialog.open(BilgilerDialogComponent,{
      width:'690px',
      data:{
        kayit:yenikayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
      
        this.apiservice.hastabilgiekle(d).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if (s.islem){
            this.hastabilgilerlistele();
          }
        });
      }
    })
  }
  
  duzenle(kayit:hastabilgi){
  
    this.dialogRef=this.MatDialog.open(BilgilerDialogComponent,{
      width:'690px',
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
        kayit.Sicaklik=d.Sicaklik;
        kayit.Diyet=d.Diyet;
        kayit.Alerji=d.Alerji;
        kayit.OlcmeTarihi=d.OlcmeTarihi;
        kayit.OlcmeYapanDoktorKimlik=d.OlcmeYapanDoktorKimlik;
        kayit.DoktorAdSoyad=d.DoktorAdSoyad;
        kayit.bilgiaitHastaKimlik=d.bilgiaitHastaKimlik;
        
        
        this.apiservice.hastabilgiduzenle(kayit).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          this.hastabilgilerlistele();
        });
      }
    })
  }
  
  sil(kayit:hastabilgi){   
    this.confirmDialogRef=this.MatDialog.open(ConfirmDialogComponent,{
      width:"400px"
    });
    this.confirmDialogRef.componentInstance.dialogmesaj=kayit.HastaBilgiId +" bu numarali hasta bilgi kayidi silinecektir, onayliyor musunuz?"
  
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiservice.hastabilgisil(kayit.HastaBilgiId).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if(s.islem){
            this.hastabilgilerlistele();
          }
        })
      }
    })
  }
  
  }