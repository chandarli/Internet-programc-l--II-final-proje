import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';

import { sonuc } from 'src/app/moduls/sonuc';
import { TahlilSonuc } from 'src/app/moduls/TahlilSonuc';

import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';
import { TahlilsonucDialogComponent } from '../../dialog/alert-dialog/tahlilsonuc-dialog/tahlilsonuc-dialog.component';
import { TahlilsonucFotoDialogComponent } from '../../dialog/alert-dialog/tahlilsonucFoto-dialog/tahlilsonucFoto-dialog.component';

@Component({
  selector: 'app-tahlilsonuc',
  templateUrl: './tahlilsonuc.component.html',
  styleUrls: ['./tahlilsonuc.component.scss']
})
export class TahlilsonucComponent implements OnInit {

  tahlilatsonuclar : TahlilSonuc[];
  displayedColumns=['TahlilSonucId','TahlilSonucTarih','TahlilSonuchastakayitad','TahilSonucDoktorad','islemler'];
  dataSource:any;
  
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) Paginator:MatPaginator;
  
  dialogRef:MatDialogRef<TahlilsonucDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  fotodialogRef:MatDialogRef<TahlilsonucFotoDialogComponent>;
  
    constructor(
      public apiservice: ApiService,
      public MatDialog:MatDialog,
      public alert:MyalertserviceService,
    ) { }
  
    ngOnInit() { 
      this.tahlilsonuslistele();

    }
  
    tahlilsonuslistele(){
    this.apiservice.TahlilSonucliste().subscribe((d:TahlilSonuc[])=>{
      this.tahlilatsonuclar=d;
 
  
      
      this.dataSource= new MatTableDataSource(this.tahlilatsonuclar);
    
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
    var yenikayit:TahlilSonuc  =new TahlilSonuc();
    this.dialogRef=this.MatDialog.open(TahlilsonucDialogComponent,{
      width:'400px',
      data:{
        kayit:yenikayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
    
        this.apiservice.TahlilSonucekle(d).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if (s.islem){
            this.tahlilsonuslistele();
          }
        });
      }
    })
  }
  
  duzenle(kayit:TahlilSonuc){
  
    this.dialogRef=this.MatDialog.open(TahlilsonucDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
    
        kayit.TahlilSonucId=d.TahlilSonucId;
        kayit.TahlilSonuc1= d.TahlilSonuc1;
        kayit.TahlilSonucTarih=d.TahlilSonucTarih;
        kayit.TahilSonucDoktor=d.TahilSonucDoktor;
        kayit.TahlilSonuchastakayit=d.TahlilSonuchastakayit;

    
        this.apiservice.TahlilSonucduzenle(kayit).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          this.tahlilsonuslistele();
        });
      }
    })
  }
  
  sil(kayit:TahlilSonuc){   
    this.confirmDialogRef=this.MatDialog.open(ConfirmDialogComponent,{
      width:"400px"
    });
    this.confirmDialogRef.componentInstance.dialogmesaj=kayit.TahlilSonucId +" bu nomarali Tahlil Sonuc  silinecektir, onayliyor musunuz?"
  
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiservice.TahlilSonucsil(kayit.TahlilSonucId).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if(s.islem){
            this.tahlilsonuslistele(); 
          }
        })
      }
    })
  }

  duzenle1(kayit:TahlilSonuc){
  
    this.fotodialogRef=this.MatDialog.open(TahlilsonucFotoDialogComponent,{
      width:'900px',
      height:'max-content',
      data:{
        kayit:kayit,
      
      }
    });
    
  }

  }