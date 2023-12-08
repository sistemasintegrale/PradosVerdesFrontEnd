import { Component, OnInit } from '@angular/core';
declare function customInitFunctions(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  ngOnInit(): void {
    customInitFunctions();
  }
}
