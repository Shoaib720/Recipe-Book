import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selected = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }
  onClickRecipes(){
    this.selected.emit("recipes")
    // console.log("recipes emitted")
  }
  onClickShoppingList(){
    this.selected.emit("shoppingList")
    // console.log("shoppingList emitted")
  }

}
