import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shared/shoppingListService.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';

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
  itemIndex: number;
  editMode = false;
  clearDisable = false;
  isEmpty = true;
  ingredientToEdit: Ingredient;
  items: number;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.editSub = this.shoppingService.startEditing.subscribe(
      (index: number) => {
        this.itemIndex = index;
        this.editMode = true;
        this.ingredientToEdit = this.shoppingService.getIngredientById(index);
        this.shForm.form.setValue({
          name : this.ingredientToEdit.name,
          amount : this.ingredientToEdit.amount
        });
      }
    );
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
      this.shoppingService.updateIngredient(this.itemIndex, newIngredient);
    }
    else{
      this.shoppingService.addIngredient(newIngredient);
      this.isEmpty = false;
    }
    this.resetForm();
  }

  onDelete(){
    this.items = this.shoppingService.deleteIngredient(this.itemIndex);
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
  }

  private resetForm(){
    this.shForm.form.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.editSub.unsubscribe();
  }

}
