import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ems';
  constructor() {

  }
  ngOnInit(): void {
  }
}
