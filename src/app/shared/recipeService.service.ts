import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from './shoppingListService.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService{
    constructor(
      private shoppingService: ShoppingListService,
      private store: Store<fromApp.AppState>
    ){}

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];

    // private recipes: Recipe[] = [
    //     {
    //         name: 'Chicken Biryani',
    //         description: 'Halal Chicken Biryani',
    //         imagePath: '../../assets/Chicken-Biryani_resized.jpg',
    //         ingredients : [
    //             new Ingredient('Chicken', 3),
    //             new Ingredient('Rice', 2),
    //             new Ingredient('Salad', 3),
    //             new Ingredient('Spices', 2)
    //         ]
    //     },
    //     {
    //         name : 'Chicken Hakka Noodles',
    //         description : 'Tasty Chinese',
    //         imagePath : '../../assets/Chicken-Hakka-Noodles-4.jpg',
    //         ingredients : [
    //             new Ingredient('Chicken', 3),
    //             new Ingredient('Noodles', 2),
    //             new Ingredient('Red Chilli Sauce', 3),
    //             new Ingredient('Vinegar', 2)
    //         ]
    //     }
    // ];


    setRecipes(fetchedRecipes: Recipe[]){
      this.recipes = fetchedRecipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
      // RecipeListComponent
      return this.recipes.slice();
    }

    getRecipeById(index: number) {
      // RecipeDetailComponent
      return this.recipes[index];
    }
    addToShoppingList(ingredients: Ingredient[]){
      // RecipeDetailComponent
      // this.shoppingService.addIngredients(ingredients);
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }
    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
