import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import { Paths } from '../app-routing.module';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private subs = new SafeSubscriber();
  sidebarVisible: boolean = true;
  title: string = '';
  subtitle: string = '';

  constructor(
    // public loading: LoadingService,
    // private configService: ConfigsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.setTitleByPath();
    // this.setSubtitle();
  }

  sidebarToggle(){
    this.sidebarVisible = !this.sidebarVisible;
  }

  private setTitleByPath(){
    switch (this.router.url.substring(1)){
      case Paths.demo: this.title = 'Demo';
        break;
      case Paths.home: this.title = 'Home';
        break;
    }
  }

  // private setSubtitle(): void{
  //   this.subs.add(
  //   this.service.getTitle().subscribe(
  //     title => this.subtitle = title? ' - '+title : ''
  //   ));
  // }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
