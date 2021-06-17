import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HastabilgilistesiComponent } from './components/pages/hastabilgilistesi/hastabilgilistesi.component';
import { HastalistesiComponent } from './components/pages/hastalistesi/hastalistesi.component';
import { HesabimComponent } from './components/pages/hesabim/hesabim/hesabim.component';
import { KontrolPanelComponent } from './components/pages/kontrol-panel/kontrol-panel/kontrol-panel.component';
import { RandevuComponent } from './components/pages/randevu/randevu.component';
import { TahlilsonucComponent } from './components/pages/tahlilsonuc/tahlilsonuc.component';
import { TipdaliComponent } from './components/pages/tipdali/tipdali.component';
import { RaceteComponent } from './components/pages/racete/racete.component';
import { HastalarComponent } from './components/pages/hastalar/hastalar.component';
import { HastabilgilerComponent } from './components/pages/hastabilgiler/hastabilgiler.component';
import { AuthGuard } from './services/AuthGuard';



const routes: Routes = [{
  path :'',
  component : LoginComponent,
},{
  path :'kontrol-panel',
  component : KontrolPanelComponent,
},{
  path :'hesabim',
  component : HesabimComponent,
},{
  path :'hastalistesi/:DoktorKimlik',
  component : HastalistesiComponent,
},{
  path :'hastabilgilistesi/:HastaKimlik',
  component : HastabilgilistesiComponent,
},
{
  path :'hastalar',
  component : HastalarComponent,
},
{
  path :'hastabilgiler',
  component : HastabilgilerComponent,
  canActivate:[AuthGuard],
  data:{
    yetkiler:["Admin"],
    gerigit:'/hesabim'
  }
},
{
  path :'randevu',
  component : RandevuComponent,
},
{
  path :'recete',
  component : RaceteComponent,
},
{
  path :'tahlilsonuc',
  component : TahlilsonucComponent,
},
{
  path :'tipdali',
  component : TipdaliComponent,
  canActivate:[AuthGuard],
  data:{
    yetkiler:["Admin"],
    gerigit:'/hesabim'
  }
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 