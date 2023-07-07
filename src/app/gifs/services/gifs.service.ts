import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor() { }

  //propiedad de todo lo que busca
  private _tagsHistory: string[] = [];

  //
  private apiKey:String = 'hhYcbxDnbxewglZZQuPdfQftGAJUpe5Q';

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  //metodo para organizar el historial en basea ya buscados
  private orgamizeHistory(tag:string){
    //pasar todo a minuscula para mejorar la busqueda
    tag= tag.toLowerCase();
    //condicion para ver si existe o no en el arrego para prganizarlo de nuevo
    if(this._tagsHistory.includes(tag)){
      //se elimina
      this._tagsHistory =  this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);

    //limitacion de mostrar el historial a 10
    this._tagsHistory = this._tagsHistory.splice(0,9);
  }

  //metodo nuevo
  public seachTag(tag:string):void{
    //para que si manda vacio no haga nada
    if (tag.length === 0 ) return
    this.orgamizeHistory(tag);

  }

}
