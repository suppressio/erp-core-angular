import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import { Paths } from '../app-routing.module';
import {DOCUMENT} from '@angular/common';

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

  private static readonly THEME_CLASS = 'dark-theme';
  private static readonly THEME_LIGHT = 'light';
  private static readonly THEME_DARK = 'dark';

  public theme: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    // public loading: LoadingService,
    // private configService: ConfigsService,
    private router: Router
    ) {
      this.theme = 
        this.document.documentElement.classList.contains(LayoutComponent.THEME_CLASS) ? 
        LayoutComponent.THEME_DARK : 
        LayoutComponent.THEME_LIGHT;
    }

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

  public toggleTheme(){
    if(this.theme === LayoutComponent.THEME_LIGHT)
      this.selectDarkTheme();
    else
      this.selectLightTheme();
  }

  public selectDarkTheme(): void {
    this.document.documentElement.classList.add(LayoutComponent.THEME_CLASS);
    this.theme = LayoutComponent.THEME_DARK;
  }

  public selectLightTheme(): void {
      this.document.documentElement.classList.remove(LayoutComponent.THEME_CLASS);
      this.theme = LayoutComponent.THEME_LIGHT;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
