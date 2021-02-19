import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap} from 'rxjs/operators';

import { RecipeService } from './recipeService.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService{


  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
  ){}

  storeData(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://myangularproject-7e54f.firebaseio.com/recipes.json', recipes).subscribe();
  }

  fetchData(){
    return this.http.get<Recipe[]>(
      'https://myangularproject-7e54f.firebaseio.com/recipes.json'
      ).
      pipe(
        map(
          recipes => {
            return recipes.map(
              recipe => {
                return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : [] };
              }
            );
          }
        ),
        tap(
          recipes => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }

}
