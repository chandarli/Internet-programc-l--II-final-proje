import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';

import { Doktorlar } from 'src/app/moduls/Doktorlar';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { sonuc } from 'src/app/moduls/sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';
import { HastaDialogComponent } from '../../dialog/alert-dialog/hasta-dialog/hasta-dialog.component';


@Component({
  selector: 'app-hastalar',
  templateUrl: './hastalar.component.html',
  styleUrls: ['./hastalar.component.scss']
})
export class HastalarComponent implements OnInit {
  
  hastalar : hastakayit[];
  displayedColumns=['HastaFoto','HastaKimlik','HastaAdSoyad','HastaDogumTarihi','HastaE_posta','HastaTelefon','TedaviYapanDoktorad','TipDali','islemler'];
  dataSource:any;
  
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) Paginator:MatPaginator;
  
  dialogRef:MatDialogRef<HastaDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  
    constructor(
      public apiservice: ApiService,
      public MatDialog:MatDialog,
      public alert:MyalertserviceService,
    ) { }
  
    ngOnInit() { 
      this.hastalarlistele();
    }
  
    hastalarlistele(){
    this.apiservice.hastakayitliste().subscribe((d:hastakayit[])=>{
      this.hastalar=d;
     
  
      
      this.dataSource= new MatTableDataSource(this.hastalar);
    
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
    var yenikayit:Doktorlar=new Doktorlar();
    this.dialogRef=this.MatDialog.open(HastaDialogComponent,{
      width:'800px',
      data:{
        kayit:yenikayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
     
        this.apiservice.hastaKayitekle(d).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if (s.islem){
            this.hastalarlistele();
          }
        });
      }
    })
  }
  
  duzenle(kayit:hastakayit){
  
    this.dialogRef=this.MatDialog.open(HastaDialogComponent,{
      width:'800px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
  
        kayit.HastaKimlik=d.HastaKimlik;
        kayit.HastaAdSoyad=d.HastaAdSoyad;
        kayit.HastaDogumTarihi=d.HastaDogumTarihi;
        kayit.HastaE_posta=d.HastaE_posta;
        kayit.HastaFoto=d.HastaFoto;
        kayit.HastaSifre=d.HastaSifre;
        kayit.HastaTelefon=d.HastaTelefon;
        kayit.TipDali=d.TipDali;
        kayit.HastaTipDaliId=d.HastaTipDaliId;
        kayit.HastaKayitBilgiId=d.HastaKayitBilgiId;
        kayit.TedaviYapanDoktorKimlik=d.TedaviYapanDoktorKimlik;

  
        this.apiservice.hastaKayitduzenle(kayit).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          this.hastalarlistele();
        });
      }
    })
  }
  
  sil(kayit:hastakayit){   
    this.confirmDialogRef=this.MatDialog.open(ConfirmDialogComponent,{
      width:"400px"
    });
    this.confirmDialogRef.componentInstance.dialogmesaj=kayit.HastaAdSoyad +" hasta kayidi silinecektir, onayliyor musunuz?"
  
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiservice.hastaKayitsil(kayit.HastaKimlik).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if(s.islem){
            this.hastalarlistele();
          }
        })
      }
    })
  }
  
  }