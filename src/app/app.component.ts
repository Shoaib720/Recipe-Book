import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping';
  selected = ""
  onSelected(firedSelection : string){
    this.selected = firedSelection
    // console.log(firedSelection)
  }
}
