import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthenticationService } from '../auths/authentication.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  authSub: Subscription;

  @Output() selected = new Subject<string>();
  constructor(
    private dataService: DataStorageService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe(
      (user: User) => {
        this.isAuthenticated = !!user;
      }
    );
  }
  onClickRecipes(){
    this.selected.next('recipes');
  }
  onClickShoppingList(){
    this.selected.next('shoppingList');
  }

  onLogout(){
    this.authService.logout();
  }

  onSave(){
    this.dataService.storeData();
  }

  onFetch(){
    this.dataService.fetchData().subscribe();
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }

}
