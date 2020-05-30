import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe : recipe
  @Output() recipeSelected = new EventEmitter<void>()
  constructor() { }
  ngOnInit(): void {
  }
  onRecipeItemSelect(){
    this.recipeSelected.emit()
  }

}
