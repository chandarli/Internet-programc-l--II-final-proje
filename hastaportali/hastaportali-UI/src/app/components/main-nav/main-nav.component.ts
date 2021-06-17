import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  DoktorAdSoyad:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public apiservis:ApiService
    ) {}
  ngOnInit(): void {
    if (this.apiservis.oturumkontrol){
      this.DoktorAdSoyad = localStorage.getItem("adsoyad");
    }
  }

  oturumkapat(){
    localStorage.clear();
    location.href="/"
  }

  

}
