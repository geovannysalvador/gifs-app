import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h2>Buscar:</h2>
    <input
    type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `
})

export class SearchBoxComponent {
  //para usar el servicio lo injectamos en el constructor
  constructor( private gifsService: GifsService) { }

  //decorador usando child
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  //metodo
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    //llegada de dato nuevo
    this.gifsService.seachTag(newTag);
    //limpiar
    this.tagInput.nativeElement.value = '';

  }

}
