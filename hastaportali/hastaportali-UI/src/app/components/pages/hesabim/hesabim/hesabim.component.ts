import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { DoktorDialogComponent } from 'src/app/components/dialog/alert-dialog/doktor-dialog/doktor-dialog.component';
import { Doktorlar } from 'src/app/moduls/Doktorlar';
import { sonuc } from 'src/app/moduls/sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';


@Component({
  selector: 'app-hesabim',
  templateUrl: './hesabim.component.html',
  styleUrls: ['./hesabim.component.scss'], 
}

)
export class HesabimComponent implements OnInit {
Doktorlar : Doktorlar[];
displayedColumns=['DoktorFoto','DoktorKimlik','DoktorAdSoyad','DoktorTel','DoktorE_mail','TipDali','HastaAdSoyad','randevular','islemler'];
dataSource:any;

@ViewChild(MatSort) sort : MatSort;
@ViewChild(MatPaginator) Paginator:MatPaginator;

dialogRef:MatDialogRef<DoktorDialogComponent>;
confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiservice: ApiService,
    public MatDialog:MatDialog,
    public alert:MyalertserviceService,
  ) { }

  ngOnInit() { 
    this.Doktorlarlistele();
  }

  Doktorlarlistele(){
  this.apiservice.Doktorlarliste().subscribe((d:Doktorlar[])=>{
    this.Doktorlar=d;

    
    this.dataSource= new MatTableDataSource(this.Doktorlar);
  
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
  this.dialogRef=this.MatDialog.open(DoktorDialogComponent,{
    width:'400px',
    data:{
      kayit:yenikayit,
      islem:'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){

      this.apiservice.Doktorlarekle(d).subscribe((s:sonuc)=>{
        this.alert.alertuygula(s);
        if (s.islem){
          this.Doktorlarlistele();
        }
      });
    }
  })
}

duzenle(kayit:Doktorlar){

  this.dialogRef=this.MatDialog.open(DoktorDialogComponent,{
    width:'400px',
    data:{
      kayit:kayit,
      islem:'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
      kayit.DoktorKimlik=d.DoktorKimlik;
      kayit.DoktorAdSoyad=d.DoktorAdSoyad;
      kayit.DoktorTel=d.DoktorTel;
      kayit.DoktorE_mail=d.DoktorE_mail;
      kayit.DoktorFoto=d.DoktorFoto;
      kayit.DoktorSifre=d.DoktorSifre;
      kayit.TedaviAlanlarKimlik=d.TedaviAlanlarKimlik;
      kayit.DoktorTipDaliId=d.DoktorTipDaliId;
      kayit.randevular=d.randevular;

      this.apiservice.Doktorlarduzenle(kayit).subscribe((s:sonuc)=>{
        this.alert.alertuygula(s);
        this.Doktorlarlistele();
      });
    }
  })
}

sil(kayit:Doktorlar){   
  this.confirmDialogRef=this.MatDialog.open(ConfirmDialogComponent,{
    width:"400px"
  });
  this.confirmDialogRef.componentInstance.dialogmesaj=kayit.DoktorAdSoyad +" doktor kayidi silinecektir, onayliyor musunuz?"

  this.confirmDialogRef.afterClosed().subscribe(d=>{
    if(d){
      this.apiservice.Doktorlarsil(kayit.DoktorKimlik).subscribe((s:sonuc)=>{
        this.alert.alertuygula(s);
        if(s.islem){
          this.Doktorlarlistele();
        }
      })
    }
  })
}

}