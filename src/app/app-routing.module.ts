import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  {path : '' , redirectTo : '/home', pathMatch : 'full'},
  {path : 'home', component: HomeComponent},
  {path : 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path : 'auth' , loadChildren: () => import('./auths/auth.module').then(m => m.AuthModule)},
  {path : 'shopping-list' , loadChildren: () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule)}
];

@NgModule({
  imports : [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports : [RouterModule]
})

export class AppRoutingModule{

}
