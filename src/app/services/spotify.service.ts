import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  constructor(
    private _http:HttpClient
  ) { 
   
  }
  getQuery(query: string, token: string): Observable<any> {
  const url = `https://api.spotify.com/v1/${query}`;
  console.log(url);
  const auth = `Bearer ${token}`;
  console.log(`auth ${auth}`);
  const headers = new HttpHeaders().set('Authorization',auth);
  console.log('service', headers);
  return this._http.get(url, {headers});
  }

  
  getNewReleases(){
   return this.getToken(this.getQuery,"browse/new-releases");
  }
  getArtists(term:string){
    return this.getToken(this.getQuery,`search?q=${term}&type=artist`)
      .pipe(map((data:any)=> data.artists.items
    ));
   
  }
  getArtist(term:string){
    return this.getToken(this.getQuery,`artists/${term}`);
   
  }
  getTopTracks(term:string){
    return this.getToken(this.getQuery,`artists/${term}/top-tracks?country=US`)
      .pipe(map(data=> data['tracks']));
  
  }
  getToken( fun: Function , query: string){
    const clientSecret  = '764b7c0645b8490fa10f50f2a3450028';
    const clientId = '567b16bdfd234132942483002be41bc0';
    const url = 'http://127.0.0.1:3000/spotify/';
    let token = ''; 
    const headers = 
    this._http.get(url + `${clientId}/${clientSecret}`)
    .subscribe((
      (result: any ) => {
        console.log( result.access_token);
        token = result.access_token; 
        return fun(query, token);
      }
    ));

  }
}
