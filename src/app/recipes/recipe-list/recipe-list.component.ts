import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeListItemSelected = new EventEmitter<recipe>()
  recipes : recipe[] = [
    {
      name: "Chicken Biryani",
      description:"Halal Chicken Biryani",
      imagePath: "https://images.food52.com/N6TN7x-H4ZTPEHbZVVuiO1iTqLc=/768x511/d815e816-4664-472e-990b-d880be41499f--chicken-biryani-recipe.jpg"
    }
  ]
  
  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected(recipe : recipe){
    this.recipeListItemSelected.emit(recipe)
    console.log("in recipe-list.component")
    console.log(recipe)
  }

}
