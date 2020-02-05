import { MenuService } from './../../service/menu/menu.service';
import { MainService } from './../../service/main.service';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { GlobalDataService } from 'src/app/service/globalData/global-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user: any;
  public menus: any;
  public currentUrl: string;
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  // @ViewChild('trigger') customTrigger: TemplateRef<void>;

  // changeTrigger(): void {
  //   this.triggerTemplate = this.customTrigger;
  // }
  private currentUser: any;

  constructor(
    private router: Router, 
    private globalData: GlobalDataService, 
    private mainSV: MainService,
    private menuSV: MenuService) { 
  }

  ngOnInit() {
    // const token = localStorage.getItem('token');
    // this.currentUser = jwt_decode(token);
    // this.globalData.setCurrentUser(this.currentUser);

    this.user = this.mainSV.getCurrentUser();
    this.menus = this.menuSV.getMenu();
    this.currentUrl = this.router.url;

  }

  getSelected(url) {
    return url == this.currentUrl ? true : false;
  }

  getOpenSubMenu(item) {
    let hasItem = item.subMenu.find(e => { return e.url == this.currentUrl })
    return hasItem ? true : false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
