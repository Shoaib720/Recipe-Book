import { Ingredient } from './ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService{
    ingredientSelected = new EventEmitter<Ingredient>()
    ingredientsChanged = new EventEmitter<Ingredient[]>()
    private ingredients: Ingredient[] = []

    getIngredients(){
        return this.ingredients.slice()
    }
    addIngredient(ingredient : Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
    // addIngredient(ingName : string,ingAmount : number){
    //     this.ingredients.push({name : ingName,amount : ingAmount})
    // }
    clearIngredients(){
        // console.log(this.ingredients)
        // console.log('in service before clear')
        this.ingredients = []
        this.ingredientsChanged.emit(this.ingredients.slice())
        // console.log('ingredients cleared')
    }
    deleteIngredient(ingredient : Ingredient){
        var i = this.ingredients.indexOf(ingredient)
        console.log('service : '+i)
        this.ingredients.splice(i,1)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
    addIngredients(addedIngredients : Ingredient[]){
        this.ingredients.push(...addedIngredients)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
}