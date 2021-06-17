import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { materialmodule } from './material.module';
import { MyalertserviceService } from './services/myalertservice.service';
import { ConfirmDialogComponent } from './components/dialog/alert-dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HesabimComponent } from './components/pages/hesabim/hesabim/hesabim.component';
import { KontrolPanelComponent } from './components/pages/kontrol-panel/kontrol-panel/kontrol-panel.component';
import { DoktorDialogComponent } from './components/dialog/alert-dialog/doktor-dialog/doktor-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HastalistesiComponent } from './components/pages/hastalistesi/hastalistesi.component';
import { KayitDialogComponent } from './components/dialog/alert-dialog/kayit-dialog/kayit-dialog.component';
import { HastabilgilistesiComponent } from './components/pages/hastabilgilistesi/hastabilgilistesi.component';
import { HastabilgiDialogComponent } from './components/dialog/alert-dialog/hastabilgi-dialog/hastabilgi-dialog.component';
import { HastalarComponent } from './components/pages/hastalar/hastalar.component';
import { HastabilgilerComponent } from './components/pages/hastabilgiler/hastabilgiler.component';
import { RaceteComponent } from './components/pages/racete/racete.component';
import { RandevuComponent } from './components/pages/randevu/randevu.component';
import { TahlilsonucComponent } from './components/pages/tahlilsonuc/tahlilsonuc.component';
import { TipdaliComponent } from './components/pages/tipdali/tipdali.component';
import { HastaDialogComponent } from './components/dialog/alert-dialog/hasta-dialog/hasta-dialog.component';
import { BilgilerDialogComponent } from './components/dialog/alert-dialog/bilgiler-dialog/bilgiler-dialog.component';
import { ReceteDialogComponent } from './components/dialog/alert-dialog/recete-dialog/recete-dialog.component';
import { RandevuDialogComponent } from './components/dialog/alert-dialog/randevu-dialog/randevu-dialog.component';
import { TahlilsonucDialogComponent } from './components/dialog/alert-dialog/tahlilsonuc-dialog/tahlilsonuc-dialog.component';
import { TipdaliDialogComponent } from './components/dialog/alert-dialog/tipdali-dialog/tipdali-dialog.component';
import { TahlilsonucFotoDialogComponent } from './components/dialog/alert-dialog/tahlilsonucFoto-dialog/tahlilsonucFoto-dialog.component';
import { AuthInterceptor } from './services/authinterceptor';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/AuthGuard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    HesabimComponent,
    KontrolPanelComponent,
    HastalistesiComponent,
    HastabilgilistesiComponent,
    HastalarComponent,
    HastabilgilerComponent,
    RaceteComponent,
    RandevuComponent,
    TahlilsonucComponent,
    TipdaliComponent,
    
    

    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    DoktorDialogComponent,
    KayitDialogComponent,
    HastabilgiDialogComponent,
    HastaDialogComponent,
    BilgilerDialogComponent,
    ReceteDialogComponent,
    RandevuDialogComponent,
    TahlilsonucDialogComponent,
    TipdaliDialogComponent,
    TahlilsonucFotoDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialmodule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
entryComponents:[
  AlertDialogComponent,
  ConfirmDialogComponent,
  DoktorDialogComponent,
  KayitDialogComponent,
  HastabilgiDialogComponent,
  HastaDialogComponent,
  BilgilerDialogComponent,
  ReceteDialogComponent,
  RandevuDialogComponent,
  TahlilsonucDialogComponent,
  TipdaliDialogComponent,
  TahlilsonucFotoDialogComponent,
],

  providers: [MyalertserviceService , ApiService , AuthGuard,
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
