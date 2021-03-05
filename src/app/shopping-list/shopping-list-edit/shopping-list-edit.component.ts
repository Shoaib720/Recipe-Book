import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shared/shoppingListService.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shForm: NgForm;
  @Input() listCount: number;
  editSub: Subscription;
  recToShop: Subscription;
  editMode = false;
  clearDisable = false;
  isEmpty = true;
  ingredientToEdit: Ingredient;
  items: number;

  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.editSub = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.ingredientToEdit = stateData.editedIngredient;
        this.shForm.form.setValue({
          name : this.ingredientToEdit.name,
          amount : this.ingredientToEdit.amount
        });
      }else{
        this.editMode = false;
      }
    })
    // this.editSub = this.shoppingService.startEditing.subscribe(
    //   (index: number) => {
    //     this.itemIndex = index;
    //     this.editMode = true;
    //     this.ingredientToEdit = this.shoppingService.getIngredientById(index);
    //     this.shForm.form.setValue({
    //       name : this.ingredientToEdit.name,
    //       amount : this.ingredientToEdit.amount
    //     });
    //   }
    // );
    if (this.shoppingService.getIngredientsCount() > 0){
      this.isEmpty = false;
    }
    // console.log(this.shoppingService.recToShop);
    // this.isEmpty = !this.shoppingService.recToShop;
  }


  onAdd(form: NgForm){
    const value = form.value;
    // console.log(form);
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      // this.shoppingService.updateIngredient(this.itemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    }
    else{
      // this.shoppingService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      this.isEmpty = false;
    }
    this.resetForm();
  }

  onDelete(){
    // this.items = this.shoppingService.deleteIngredient(this.itemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    if(this.items > 0){
      this.isEmpty = false;
    }else{
      this.isEmpty = true;
    }
    this.resetForm();
  }

  onDeleteAll(){
    this.shoppingService.clearIngredients();
    this.isEmpty = true;
    this.resetForm();
  }

  onClear(){
    this.resetForm();
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }

  private resetForm(){
    this.shForm.form.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.editSub.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }

}
