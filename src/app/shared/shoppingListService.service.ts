import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService{

  // private ingredientsCount: number;
  // ShoppingListComponent
  startEditing = new Subject<number>();

  // ShoppingListComponent
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Tomatoes", 3),
    new Ingredient("Onions", 2)
  ];

  getIngredientsCount(){
    return this.ingredients.length;
  }

  getIngredients(){
    // ShoppingListComponent
    return this.ingredients.slice();
  }

  getIngredientById(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    // ShoppingListEditComponent
    this.ingredients.push(ingredient);
    // this.ingredientsCount = this.ingredients.length;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearIngredients(){
    // ShoppingListEditComponent
    this.ingredients = [];
    // this.ingredientsCount = this.ingredients.length;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    // ShoppingListComponent
    this.ingredients.splice(index, 1);
    // this.ingredientsCount = this.ingredients.length;
    this.ingredientsChanged.next(this.ingredients.slice());
    return this.ingredients.length;
  }
  addIngredients(addedIngredients: Ingredient[]){
    this.ingredients.push(...addedIngredients);
    // this.ingredientsCount = this.ingredients.length;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
