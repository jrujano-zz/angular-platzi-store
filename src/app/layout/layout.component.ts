import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  logoUrl: 'assets/images/logo-color.png';
  constructor() { }

  ngOnInit(): any {
  }

}
