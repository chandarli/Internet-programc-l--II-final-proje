import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';

import { sonuc } from 'src/app/moduls/sonuc';
import { TipDallari } from 'src/app/moduls/TipDallari';
import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';

import { TipdaliDialogComponent } from '../../dialog/alert-dialog/tipdali-dialog/tipdali-dialog.component';

@Component({
  selector: 'app-tipdali',
  templateUrl: './tipdali.component.html',
  styleUrls: ['./tipdali.component.scss']
})
export class TipdaliComponent implements OnInit {

  tipdallar : TipDallari[];
  displayedColumns=['TipDaliId','TipDali','TipDalihastakayitad','TipDaliDoktorad','islemler'];
  dataSource:any;
  
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) Paginator:MatPaginator;
  
  dialogRef:MatDialogRef<TipdaliDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  
    constructor(
      public apiservice: ApiService,
      public MatDialog:MatDialog,
      public alert:MyalertserviceService,
    ) { }
  
    ngOnInit() { 
      this.tipdallarlistele();

    }
  
    tipdallarlistele(){
    this.apiservice.Tipdallariliste().subscribe((d:TipDallari[])=>{
      this.tipdallar=d;
  
  
      
      this.dataSource= new MatTableDataSource(this.tipdallar);
    
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
    var yenikayit:TipDallari  =new TipDallari();
    this.dialogRef=this.MatDialog.open(TipdaliDialogComponent,{
      width:'400px',
      data:{
        kayit:yenikayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){

        this.apiservice.Tipdallariekle(d).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if (s.islem){
            this.tipdallarlistele();
          }
        });
      }
    })
  }
  
  duzenle(kayit:TipDallari){
  
    this.dialogRef=this.MatDialog.open(TipdaliDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){

        kayit.TipDaliId=d.TipDaliId;
        kayit.TipDali=d.TipDali;
        kayit.TipDalihastakayit=d.TipDalihastakayit;
        kayit.TipDaliDoktor=d.TipDaliDoktor;

    
        this.apiservice.Tipdallariduzenle(kayit).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          this.tipdallarlistele();
        });
      }
    })
  }
  
  sil(kayit:TipDallari){   
    this.confirmDialogRef=this.MatDialog.open(ConfirmDialogComponent,{
      width:"400px"
    });
    this.confirmDialogRef.componentInstance.dialogmesaj=kayit.TipDali +" olan tip dali silinecektir, onayliyor musunuz?"
  
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiservice.Tipdallarisil(kayit.TipDaliId).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if(s.islem){
            this.tipdallarlistele(); 
          }
        })
      }
    })
  }
  
  }