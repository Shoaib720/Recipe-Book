import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shoppingListService.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]
  constructor(private shoppingService : ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients()
    this.shoppingService.ingredientsChanged.subscribe(
      (changedIngredients : Ingredient[]) =>{this.ingredients = changedIngredients}
    )
    // console.log(this.ingredients)
  }
  onDeleteIngredient(ingredient : Ingredient){
    this.shoppingService.deleteIngredient(ingredient)
    console.log(ingredient.name)
  }
  // onAdded(ingredient : Ingredient){
  //   this.ingredients.push(ingredient)
  // }
  // onClearList(){
  //   this.ingredients = []
  // }

}
