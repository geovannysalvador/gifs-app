import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList:Gif[] = [];

  //propiedad de todo lo que busca
  private _tagsHistory: string[] = [];
  private apiKey:       string = 'hhYcbxDnbxewglZZQuPdfQftGAJUpe5Q';
  private serviceUrl:   string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

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
  // public seachTag(tag:string):void{
  //   //para que si manda vacio no haga nada
  //   if (tag.length === 0 ) return
  //   this.orgamizeHistory(tag);

  //metodo nuevo usando peticiones a la api
  // async seachTag(tag:string):Promise<void>{
  //   //para que si manda vacio no haga nada
  //   if (tag.length === 0 ) return
  //   this.orgamizeHistory(tag);

    //-------------primera forma
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=hhYcbxDnbxewglZZQuPdfQftGAJUpe5Q&q=valorant&limit=10')
    // .then(answer => answer.json())
    // .then(data => console.log(data)

    //------------------------otra forma de hacerlo
    // const answer = await fetch('http://api.giphy.com/v1/gifs/search?api_key=hhYcbxDnbxewglZZQuPdfQftGAJUpe5Q&q=valorant&limit=10')
    // const data = await answer.json();

    // console.log(data)

    // usando metodo propios de angular
    public seachTag(tag:string):void{
      if (tag.length === 0 ) return;
      this.orgamizeHistory(tag);

      const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

      this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(answer =>{
        this.gifsList = answer.data;
        // console.log({gids: this.gifsList});

      });

  }

}
