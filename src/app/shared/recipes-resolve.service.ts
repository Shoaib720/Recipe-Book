import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from 'src/app/shared/recipeService.service';

@Injectable({providedIn: 'root'})
export class RecipesResolveService implements Resolve<Recipe[]>{

  recipes: Recipe[];

  constructor(
    private dataService: DataStorageService,
    private recipeService: RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.recipes = this.recipeService.getRecipes();
    if (this.recipes.length === 0){
      return this.dataService.fetchData();
    }else{
      return this.recipes;
    }
  }
}
