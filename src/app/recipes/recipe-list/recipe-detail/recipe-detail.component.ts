import { Component, OnInit,Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/shared/recipeService.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input('selectedRecipeItem') selectedRecipe : Recipe
  
  // recName : string
  // recDesc : string
  constructor() { }

  ngOnInit(){
  }

}
