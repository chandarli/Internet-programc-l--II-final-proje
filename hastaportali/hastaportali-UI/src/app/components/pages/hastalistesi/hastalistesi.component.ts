import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Doktorlar } from 'src/app/moduls/Doktorlar';
import { hastakayit } from 'src/app/moduls/HastaKayit';
import { kayitler } from 'src/app/moduls/kayitler';
import { sonuc } from 'src/app/moduls/sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';
import { ConfirmDialogComponent } from '../../dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { KayitDialogComponent } from '../../dialog/alert-dialog/kayit-dialog/kayit-dialog.component';

@Component({
  selector: 'app-hastalistesi',
  templateUrl: './hastalistesi.component.html',
  styleUrls: ['./hastalistesi.component.scss'] 
})
export class HastalistesiComponent implements OnInit { 

  kayitlerliste:kayitler[];
  kayitler:kayitler;
  hastalar:hastakayit[];
  
  hastakayit:string;

  secilidocktor:Doktorlar;
  DoktorKimlik:string;

  Hastakimlik:string="";

  

  yenikayit:kayitler;

  siteurl="https://localhost:44356"
  
  displayedColumns=['HastaFoto','HastaKimlik','HastaAdSoyad','HastaDogumTarihi','HastaE_posta','HastaTelefon','TipDali','islemler'];
  dataSource :any;

  dialogRef:MatDialogRef<KayitDialogComponent>;
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
      this.DoktorKimlik = p.DoktorKimlik;
      this.doktorGetir();
      this.kayitlerlistele(); 
      this.hastakayitliste();
      }
    });
  }


  //kayit listeleme islemler


  doktorGetir(){
    this.apiservis.Doktorlarbykimlik1(this.DoktorKimlik).subscribe((d:Doktorlar)=>{
      this.secilidocktor= d;
   
    });
  }

  kayitlerlistele(){
    this.apiservis.doktorhastalarliste(this.DoktorKimlik).subscribe((d:kayitler[])=>{
      this.kayitlerliste = d;
      this.dataSource=new MatTableDataSource(this.kayitlerliste);
      
    });
  }

  hastakayitliste(){
    this.apiservis.hastakayitliste().subscribe((d:hastakayit[])=>{
      this.hastalar=d;
      
    })
  }

  hastasec(Hastakimlik:string){
    
    this.Hastakimlik=Hastakimlik;

  }

  //kayit degistirme islemler

  ekle(){
    if (this.Hastakimlik==""){
      var s : sonuc = new sonuc
      s.islem = false;
      s.mesaj = "bir hasta seciniz"
      this.alert.alertuygula(s);
      return false;

    }

    var kayit:kayitler = new kayitler();
    kayit.kayithastakimlik=this.Hastakimlik;
    kayit.kayitdoktorkimlik=this.DoktorKimlik; 

    this.apiservis.kayitlarekle(kayit).subscribe((s:sonuc)=>{
      this.alert.alertuygula(s);
      if (s.islem){
        this.kayitlerlistele();
      }
    })

  }

  duzenle(kayit:hastakayit){

    this.dialogRef=this.MatDialog.open(KayitDialogComponent,{
      width:'400px',
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
        kayit.TipDali = d.TipDali;
        kayit.HastaTipDaliId=d.HastaTipDaliId;
        kayit.HastaKayitBilgiId=d.HastaKayitBilgiId;
  
        this.apiservis.hastaKayitduzenle(kayit).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          this.kayitlerlistele();
        });
      }
    })
  }

  sil(kayit:kayitler){   
    this.confirmDialogRef=this.MatDialog.open(ConfirmDialogComponent,{
      width:"400px"
    });
    this.confirmDialogRef.componentInstance.dialogmesaj=kayit.Hastaveriler.HastaAdSoyad +" hasta kayidi silinecektir, onayliyor musunuz?"
  
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiservis.kayitlarsil(kayit.kayitId).subscribe((s:sonuc)=>{
          this.alert.alertuygula(s);
          if(s.islem){
            this.kayitlerlistele();
          }
        })
      }
    })
  }

}