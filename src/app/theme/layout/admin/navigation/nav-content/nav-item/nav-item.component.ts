import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavigationItem } from '../../navigation';
import { NextConfig } from '../../../../../../app-config';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  @Input() item: NavigationItem;
  public nextConfig: any;
  public themeLayout: string;

  constructor(private location: Location) {
    this.nextConfig = NextConfig.config;
    this.themeLayout = this.nextConfig['layout'];
  }

  ngOnInit() {
  }

  closeOtherMenu(event) {
    setTimeout(() => {
      const sections = document.querySelectorAll('.pcoded-hasmenu');
      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
        sections[i].classList.remove('pcoded-trigger');
      }

      let current_url = this.location.path();
      if (this.location['_baseHref']) {
        current_url = this.location['_baseHref'] + this.location.path();
      }
      const link = "a.nav-link[ href='" + current_url + "' ]";
      const ele = document.querySelector(link);
      if (ele !== null && ele !== undefined) {
        const parent = ele.parentElement;
        const up_parent = parent.parentElement.parentElement;
        const last_parent = up_parent.parentElement;
        if (parent.classList.contains('pcoded-hasmenu')) {
          parent.classList.add('active');
        } else if (up_parent.classList.contains('pcoded-hasmenu')) {
          up_parent.classList.add('active');
        } else if (last_parent.classList.contains('pcoded-hasmenu')) {
          last_parent.classList.add('active');
        }
      }
    }, 500);
  }

}
