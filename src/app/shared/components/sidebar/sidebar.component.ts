import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor( private gifsServices: GifsService) { }

  get tags():string[]{
    return this.gifsServices.tagsHistory;
  }

  searchTagInput(tag:string){
    this.gifsServices.seachTag(tag)
  }

}
