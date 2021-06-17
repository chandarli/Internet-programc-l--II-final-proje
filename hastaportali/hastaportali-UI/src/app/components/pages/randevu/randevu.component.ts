import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { Randevu } from 'src/app/moduls/Randevu';
import { sonuc } from 'src/app/moduls/sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';
import { RandevuDialogComponent } from '../../dialog/alert-dialog/randevu-dialog/randevu-dialog.component';


@Component({
  selector: 'app-randevu',
  templateUrl: './randevu.component.html',
  styleUrls: ['./randevu.component.scss'],
})
export class RandevuComponent implements OnInit {

  randevuler : Randevu[];
  displayedColumns=['RandevuId','RandevuSaati','RandevuTarihi','Randevuhastakayitad','RandevuDoktorAdSoyad','RandevuTipDali','islemler'];
  dataSource:any;
  
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) Paginator:MatPaginator;
  
  dialogRef:MatDialogRef<RandevuDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  
    constructor(
      public apiservice: ApiService,
      public MatDialog:MatDialog,
      public alert:MyalertserviceService,
    ) { }
  
    ngOnInit() { 
      this.randevulistele();

    }
  
    randevulistele(){
    this.apiservice.Randevuliste().subscribe((d:Randevu[])=>{
      this.randevuler=d;
;
  
      
      this.dataSource= new MatTableDataSource(this.randevuler);
    
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
    var yenikayit:Randevu  =new Randevu();
    this.dialogRef=this.MatDialog.open(RandevuDialogComponent,{
      width:'400px',
      data:{
        kayit:yenikayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
    
        this.apiservice.Randevuekle(d).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if (s.islem){
            this.randevulistele();
          }
        });
      }
    })
  }
  
  duzenle(kayit:Randevu){
  
    this.dialogRef=this.MatDialog.open(RandevuDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
  
        kayit.RandevuId=d.RandevuId;
        kayit.RandevuSaati=d.RandevuSaati;
        kayit.RandevuTarihi=d.RandevuTarihi;
        kayit.RandevuTipDaliId=d.RandevuTipDaliId;
        kayit.RandevuDoktorKimlik=d.RandevuDoktorKimlik;
        kayit.Randevuhastakayit =d.Randevuhastakayit;
    
        this.apiservice.Randevuduzenle(kayit).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          this.randevulistele();
        });
      }
    })
  }
  
  sil(kayit:Randevu){   
    this.confirmDialogRef=this.MatDialog.open(ConfirmDialogComponent,{
      width:"400px"
    });
    this.confirmDialogRef.componentInstance.dialogmesaj=kayit.RandevuId +" bu numarali randevu kayidi silinecektir, onayliyor musunuz?"
  
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiservice.Randevusil(kayit.RandevuId).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if(s.islem){
            this.randevulistele();
          }
        })
      }
    })
  }
  
  }