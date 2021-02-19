import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shoppingListService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingChangedSub: Subscription;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingChangedSub = this.shoppingService.ingredientsChanged.subscribe(
      (changedIngredients: Ingredient[]) => {
        this.ingredients = changedIngredients;
      }
    );
  }

  onEditItem(index: number){
    this.shoppingService.startEditing.next(index);
  }

  ngOnDestroy(){
    this.ingChangedSub.unsubscribe();
  }
}
