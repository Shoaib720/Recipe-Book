import { Recipe } from '../recipes/recipe.model'
import { EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from './ingredient.model'
import { ShoppingListService } from './shoppingListService.service'

@Injectable()
export class RecipeService{
    constructor(private shoppingService : ShoppingListService){}
    recipeSelected = new EventEmitter<Recipe>()
    recipes : Recipe[] = [
        {
            name: "Chicken Biryani",
            description:"Halal Chicken Biryani",
            imagePath: '../../assets/Chicken-Biryani_resized.jpg',
            ingredients : [
                new Ingredient('Chicken',3),
                new Ingredient('Rice',2),
                new Ingredient('Salad',3),
                new Ingredient('Spices',2)
            ]
        },
        {
            name : "Chicken Hakka Noodles",
            description : "Tasty Chinese",
            imagePath : '../../assets/Chicken-Hakka-Noodles-4.jpg',
            ingredients : [
                new Ingredient('Chicken',3),
                new Ingredient('Noodles',2),
                new Ingredient('Red Chilli Sauce',3),
                new Ingredient('Vinegar',2)
            ]
        }
    ]

    getRecipes(){
        return this.recipes.slice()
    }
    addToShoppingList(ingredients : Ingredient[]){
        this.shoppingService.addIngredients(ingredients)
    }
}