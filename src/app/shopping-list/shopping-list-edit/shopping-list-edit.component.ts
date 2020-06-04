import { Component, OnInit} from '@angular/core';
// import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shoppingListService.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  constructor(private shoppingService : ShoppingListService) { }
  // @Output('added') ingredient = new EventEmitter<Ingredient>()
  // @Output('cleared') clearList = new EventEmitter<void>()
  // ingredient : Ingredient
  ngOnInit(): void {
    
  }
  onAdd(nameInput : HTMLInputElement,amountInput : HTMLInputElement){
    console.log('in list edit comp add')
    console.log({name : nameInput.value, amount : parseInt(amountInput.value)})
    this.shoppingService.addIngredient({name : nameInput.value, amount : parseInt(amountInput.value)})
    
  }
  onDelete(){

  }
  onClear(){
    // console.log('in list edit comp clear')
    this.shoppingService.clearIngredients()
    // this.clearList.emit()
  }

}
