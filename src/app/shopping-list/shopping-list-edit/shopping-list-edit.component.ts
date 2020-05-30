import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  constructor() { }
  @Output('added') ingredient = new EventEmitter<Ingredient>()
  @ViewChild('name',{static:false}) name = ElementRef
  @ViewChild('amount',{static:false}) amount = ElementRef
  ngOnInit(): void {
  }
  onAdd(){
    // this.ing.name = this.name.nativeElement.value
    // this.ing.amount = this.amount.nativeElement.value
    // this.ingAmount = this.amount.nativeElement.value
    // console.log(this.name.nativeElement.value)
    // console.log(this.name.nativeElement.value)
    // console.log(this.amount.nativeElement.value)
    this.ingredient.emit({name : this.name.nativeElement.value, amount : this.amount.nativeElement.value})
  }
  onDelete(){

  }
  onClear(){

  }

}
