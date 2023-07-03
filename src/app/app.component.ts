import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './Shared/sharedService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Interview-project';
  constructor(private sharedService:SharedService)
  {}
  ngOnInit()
  {
    this.sharedService.autoLogin();
  }
  ngOnDestroy()
  {}
}
