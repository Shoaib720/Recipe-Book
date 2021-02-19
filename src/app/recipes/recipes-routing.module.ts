import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auths/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { RecipesResolveService } from '../shared/recipes-resolve.service';

const recipeRoutes: Routes = [
  {path : '' , component : RecipesComponent,
    canActivate: [AuthGuard],
    children : [
      {path : '' , component : RecipeStartComponent},
      {path : 'new', component: RecipeEditComponent},
      {path : ':id', component : RecipeDetailComponent, resolve: [RecipesResolveService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolveService]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
