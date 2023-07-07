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

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  //metodo para organizar el historial en basea ya buscados
  private orgamizeHistory(tag:string){

    tag= tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory =  this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }


    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,9);
    //mandar la info al localStorage
    this.saveLocalStorage();
  }



  //mandar la info al localStorage con string
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify (this._tagsHistory))
  }

  //cargar el localStorage
  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse (localStorage.getItem('history')!);

    if (this._tagsHistory.length ===0) return;
    this.seachTag(this._tagsHistory[0]);
  }


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
