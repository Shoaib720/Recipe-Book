import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const shoppingRoutes: Routes = [
  {path : '' , component : ShoppingListComponent}
]

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    RouterModule.forChild(shoppingRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShoppingModule {}
