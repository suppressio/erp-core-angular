import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../layout/services/loading.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor(private loading:LoadingService) { }

  ngOnInit(): void {
    this.loading.isLoading=true;
  }

}
