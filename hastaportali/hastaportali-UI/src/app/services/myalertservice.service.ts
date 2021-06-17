import { Injectable } from '@angular/core';

import{MatDialog, MatDialogRef}from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialog/alert-dialog/alert-dialog.component';
import { materialmodule } from '../material.module';


import { sonuc } from '../moduls/sonuc';

@Injectable({
  providedIn: 'root'
})
export class MyalertserviceService {
alertDialogRef:MatDialogRef<AlertDialogComponent>;

constructor(
 public matdialog:MatDialog  
) { }

alertuygula(s:sonuc){
var baslik = "";
if (s.islem){
  baslik = "islem tamam";
}else {
  baslik="hata";
}

this.alertDialogRef=this.matdialog.open(AlertDialogComponent,{
  width:"300px"
});

this.alertDialogRef.componentInstance.dialogbaslik=baslik;
this.alertDialogRef.componentInstance.dialogmesaj=s.mesaj;
this.alertDialogRef.componentInstance.dialogislem=s.islem;

this.alertDialogRef.afterClosed().subscribe(d=>{
this.alertDialogRef= null;
});
}



}
