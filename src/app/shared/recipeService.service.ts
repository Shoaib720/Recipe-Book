import { Recipe } from '../recipes/recipe.model'
import { EventEmitter } from '@angular/core'

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>()
    recipes : Recipe[] = [
        {
            name: "Chicken Biryani",
            description:"Halal Chicken Biryani",
            imagePath: '../../assets/Chicken-Biryani_resized.jpg'
        },
        {
            name : "Chicken Hakka Noodles",
            description : "Tasty Chinese",
            imagePath : '../../assets/Chicken-Hakka-Noodles-4.jpg'
        }
    ]

    getRecipes(){
        return this.recipes.slice()
    }
}