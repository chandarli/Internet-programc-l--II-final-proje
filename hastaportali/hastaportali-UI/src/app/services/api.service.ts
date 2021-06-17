import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Doktorlar } from '../moduls/Doktorlar';
import { hastabilgi } from '../moduls/hastabilgi';
import {hastakayit} from '../moduls/HastaKayit';
import { kayitler } from '../moduls/kayitler';
import {Randevu} from '../moduls/Randevu';
import {Recete} from '../moduls/Recete';
import {TahlilSonuc} from '../moduls/TahlilSonuc';
import {TipDallari} from '../moduls/TipDallari';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 apiurl="https://localhost:44356/api/";
 siteurl="https://localhost:44356/"
 constructor(
   public http:HttpClient
 ) { }


  //oturum acma islemler

 tokenal(kimlik:string,sifre:string){
  var data="username=" + kimlik + "&password=" + sifre + "&grant_type=password";
  var reqHeader =new HttpHeaders({"Content-Type":"application/x-www-form-urleuncoded"});
  return this.http.post(this.apiurl + "token",data,{headers:reqHeader});
 }

 oturumkontrol(){
  if(localStorage.getItem("token")){
    return true;
  }
  else false;
}

yetkiKontrol(yetkiler) {
  var sonuc: boolean = false;

  var doktoryetkileri: string[] = JSON.parse(localStorage.getItem("doktoryetkileri"));

  if (doktoryetkileri) {
    yetkiler.forEach(element => {
      if (doktoryetkileri.indexOf(element) > -1) {
        sonuc = true;
        return false;
      }
    });
  }

  return sonuc;
}


//api ler
 //doktorlar


Doktorlarliste (){
   return  this.http.get(this.apiurl+"Doktorlarliste");
}

Doktorlarbykimlik1(DoktorKimlik:string){
  return this.http.get(this.apiurl+"Doktorlarbykimlik1/"+DoktorKimlik)
}

Doktorlarbykimlik(DoktorKimlik:string){
   return this.http.get(this.apiurl+"Doktorlarbykimlik/"+DoktorKimlik)
}

DoktorlarHastaKayitlarListe(TedaviAlanlarKimlik:string){
  return this.http.get(this.apiurl+"DoktorlarHastaKayitlarListe/"+TedaviAlanlarKimlik)
}

DoktorlarTipDallariListe(TipDaliId:string){
  return this.http.get(this.apiurl+"DoktorlarTipDallariListe/"+TipDaliId)
}


Doktorlarekle(doktor:Doktorlar){
    return this.http.post(this.apiurl+"Doktorlarekle",doktor);
}

Doktorlarduzenle(doktor:Doktorlar){
  return this.http.put(this.apiurl+"Doktorlarduzenle",doktor)
}

Doktorlarsil(DoktorKimlik:string){
  return this.http.delete(this.apiurl+"Doktorlarsil/"+DoktorKimlik)
}




//Hastabilgi




HastaBilgiliste (){
  return  this.http.get(this.apiurl+"HastaBilgiliste");
}

HastaBilgibyid(HastaBilgiId:string){
  return this.http.get(this.apiurl+"HastaBilgibyId/"+HastaBilgiId)
}


hastabilgiekle(hastaBilgi:hastabilgi){
   return this.http.post(this.apiurl+"hastabilgiekle",hastaBilgi);
}

hastabilgiduzenle(hastaBilgi:hastabilgi){
 return this.http.put(this.apiurl+"hastabilgiduzenle",hastaBilgi)
}

hastabilgisil(hastaBilgiId:string){
 return this.http.delete(this.apiurl+"hastabilgisil/"+hastaBilgiId)
}




//hastakayit





hastakayitliste(){
  return  this.http.get(this.apiurl+"hastakayitliste");
}

HastaKayitbykimlik1(HastaKimlik:string){
  return this.http.get(this.apiurl+"HastaKayitbykimlik1/"+HastaKimlik)
}

HastaKayitbykimlik(HastaKimlik:string){
  return this.http.get(this.apiurl+"HastaKayitbykimlik/"+HastaKimlik)
}


hastaKayitekle(hastaKayit:hastakayit){
   return this.http.post(this.apiurl+"hastaKayitekle",hastaKayit);
}

hastaKayitduzenle(hastaKayit:hastakayit){
 return this.http.put(this.apiurl+"hastaKayitduzenle",hastaKayit)
}

hastaKayitsil(HastaKimlik:string){
 return this.http.delete(this.apiurl+"hastaKayitsil/"+HastaKimlik)
}



//Randevu



Randevuliste (){
  return  this.http.get(this.apiurl+"Randevuliste");
}

RandevubyId(RandevuId:string){
  return this.http.get(this.apiurl+"RandevubyId/"+RandevuId)
}


Randevuekle(Randevu:Randevu){
   return this.http.post(this.apiurl+"Randevuekle",Randevu);
}

Randevuduzenle(Randevu:Randevu){
 return this.http.put(this.apiurl+"Randevuduzenle",Randevu)
}

Randevusil(RandevuId:string){
 return this.http.delete(this.apiurl+"Randevusil/"+RandevuId)
}



//recete



Receteliste(){
  return  this.http.get(this.apiurl+"Receteliste");
}

Recetebyid(ReceteId:string){
  return this.http.get(this.apiurl+"Recetebyid/"+ReceteId)
}


Receteekle(Recete:Recete){
   return this.http.post(this.apiurl+"Receteekle",Recete);
}

Receteduzenle(Recete:Recete){
 return this.http.put(this.apiurl+"Receteduzenle",Recete)
}

Recetesil(ReceteId:string){
 return this.http.delete(this.apiurl+"Recetesil/"+ReceteId)
}



//TahlilSonuc



TahlilSonucliste(){
  return  this.http.get(this.apiurl+"TahlilSonucliste");
}

TahlilSonucbyid(TahlilSonucId:string){
  return this.http.get(this.apiurl+"TahlilSonucbyid/"+TahlilSonucId)
}


TahlilSonucekle(TahlilSonuc:TahlilSonuc){
   return this.http.post(this.apiurl+"TahlilSonucekle",TahlilSonuc);
}

TahlilSonucduzenle(TahlilSonuc:TahlilSonuc){
 return this.http.put(this.apiurl+"TahlilSonucduzenle",TahlilSonuc)
}

TahlilSonucsil(TahlilSonucId:string){
 return this.http.delete(this.apiurl+"TahlilSonucsil/"+TahlilSonucId)
}



//Tipdallari


Tipdallariliste(){
  return  this.http.get(this.apiurl+"Tipdallariliste");
}

Tipdallaribyid(TipDaliId:string){
  return this.http.get(this.apiurl+"Tipdallaribyid/"+TipDaliId)
}


Tipdallariekle(Tipdallari:TipDallari){
   return this.http.post(this.apiurl+"Tipdallariekle",Tipdallari);
}

Tipdallariduzenle(Tipdallari:TipDallari){
 return this.http.put(this.apiurl+"Tipdallariduzenle",Tipdallari)
}

Tipdallarisil(TipDaliId:string){
 return this.http.delete(this.apiurl+"Tipdallarisil/"+TipDaliId)
}

//kayitler




doktorhastalarliste(DoktorKimlik:string){
  return this.http.get(this.apiurl+"doktorhastalarliste/"+DoktorKimlik)
}


hastadoktorlarliste(HastaKimlik:string){
  return this.http.get(this.apiurl+"hastadoktorlarliste/"+HastaKimlik)
}

kayitlarekle(kayitler:kayitler){
  return this.http.post(this.apiurl+"kayitlarekle",kayitler);
}

kayitlarsil(kayitId:string){
 return this.http.delete(this.apiurl+"kayitlarsil/"+kayitId)
}

}
