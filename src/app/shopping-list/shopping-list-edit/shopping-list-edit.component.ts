import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  constructor() { }
  @Output('added') ingredient = new EventEmitter<Ingredient>()
  @Output('cleared') clearList = new EventEmitter<void>()
  
  ngOnInit(): void {
    
  }
  onAdd(nameInput : HTMLInputElement,amountInput : HTMLInputElement){
    // this.ing.name = this.name.nativeElement.value
    // this.ing.amount = this.amount.nativeElement.value
    // this.ingAmount = this.amount.nativeElement.value
    // console.log(this.name.nativeElement.value)
    // console.log(this.name.nativeElement.value)
    // console.log(this.amount.nativeElement.value)
    this.ingredient.emit({name : nameInput.value, amount : parseInt(amountInput.value)})
  }
  onDelete(){

  }
  onClear(){
    this.clearList.emit()
  }

}
