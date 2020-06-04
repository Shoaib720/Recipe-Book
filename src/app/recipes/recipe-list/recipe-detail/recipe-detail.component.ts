import { Component, OnInit,Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/shared/recipeService.service';
import { ShoppingListService } from 'src/app/shared/shoppingListService.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input('selectedRecipeItem') selectedRecipe : Recipe
  
  // recName : string
  // recDesc : string
  constructor(private recipeService : RecipeService) { }

  ngOnInit(){
  }
  toShoppingList(){
    this.recipeService.addToShoppingList(this.selectedRecipe.ingredients)
  }

}
