import {Component} from '@angular/core'
import { recipe } from './recipe.model'

@Component({
    selector : 'app-recipes',
    templateUrl : './recipes.component.html',
    styleUrls : ['./recipes.component.css']
})
export class RecipesComponent {
    selectedRecipeItem : recipe
    onRecipeListItemSelected(selectedItem){
        this.selectedRecipeItem = selectedItem
        console.log("in recipes.component")
        console.log(selectedItem)
        // console.log(this.selectedRecipeItem)
    }
}