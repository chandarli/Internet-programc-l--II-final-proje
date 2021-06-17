import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';

import { Recete } from 'src/app/moduls/Recete';

import { sonuc } from 'src/app/moduls/sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';

import { ReceteDialogComponent } from '../../dialog/alert-dialog/recete-dialog/recete-dialog.component';

@Component({
  selector: 'app-racete',
  templateUrl: './racete.component.html',
  styleUrls: ['./racete.component.scss']
})
export class RaceteComponent implements OnInit {

  receteler : Recete[];
  displayedColumns=['ReceteId','IlacAdi','Miktarlar','Doz','Sure','Recetehastakayitad','Recetedoktorad','ReceteTarih','islemler'];
  dataSource:any;
  
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) Paginator:MatPaginator;
  
  dialogRef:MatDialogRef<ReceteDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  
    constructor(
      public apiservice: ApiService,
      public MatDialog:MatDialog,
      public alert:MyalertserviceService,
    ) { }
  
    ngOnInit() { 
      this.recetelistele();

    }
  
    recetelistele(){
    this.apiservice.Receteliste().subscribe((d:Recete[])=>{
      this.receteler=d;
 
  
      
      this.dataSource= new MatTableDataSource(this.receteler);
    
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
    var yenikayit:Recete  =new Recete();
    this.dialogRef=this.MatDialog.open(ReceteDialogComponent,{
      width:'400px',
      data:{
        kayit:yenikayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){

        this.apiservice.Receteekle(d).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if (s.islem){
            this.recetelistele();
          }
        });
      }
    })
  }
  
  duzenle(kayit:Recete){
  
    this.dialogRef=this.MatDialog.open(ReceteDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){

        kayit.ReceteId=d.ReceteId;
        kayit.ReceteTarih=d.ReceteTarih;
        kayit.Recetehastakayit=d.Recetehastakayit;
        kayit.IlacAdi=d.IlacAdi;
        kayit.Doz=d.Doz;
        kayit.Miktarlar=d.Miktarlar;
        kayit.Sure=d.Sure;
        kayit.Recetedoktorkimlik =d.Recetedoktorkimlik;

        
        
        this.apiservice.Receteduzenle(kayit).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          this.recetelistele();
        });
      }
    })
  }
  
  sil(kayit:Recete){   
    this.confirmDialogRef=this.MatDialog.open(ConfirmDialogComponent,{
      width:"400px"
    });
    this.confirmDialogRef.componentInstance.dialogmesaj=kayit.ReceteId +" bu numarali recete kayidi silinecektir, onayliyor musunuz?"
  
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiservice.Recetesil(kayit.ReceteId).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if(s.islem){
            this.recetelistele();
          }
        })
      }
    })
  }
  
  }