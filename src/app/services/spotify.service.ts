import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService{
  
  constructor(
    private _http:HttpClient
  ) { 
  }
 
  token: string;
  tokenType: string;
 async  getQuery2(query: string): Promise<Observable<any>> {

   if(!this.token){
     await this.getToken()
     .then((data: any ) => {
       console.log("ASYNQUERY DATA",{data});
       this.token = data.access_token;
       console.log("ASYNQUERY TOKEN "+this.token);
      this.tokenType = data.token_type;
      
        });
    }
    const url = `https://api.spotify.com/v1/${ query }`;
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.token);
    console.log("HEADERS",headers);
    return this._http.get(url, { headers });
  }
  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDsnU8IhPdDKrUXuWq7FVMlrNmZrmMJiSyG6fRESINYgAJBBpnLiQ6GThLMuQsxqlLJVavErt4qQAgzvrA'
    });

    return this._http.get(url, { headers });

  }
  
  async getNewReleases() {
  return  await this.getQuery2('browse/new-releases?limit=20')
  .then((obs : Observable<any>) =>{
      console.log("NEW REALESES", obs);
      return obs.pipe(
        map( data => data['albums'].items )
      );
    }).catch(()=>{
      this.token= null;
      this.getNewReleases();
    });
  }
  getArtists(term:string){
    return  await this.getQuery2('browse/new-releases?limit=20')
    .then((obs : Observable<any>) =>{
        console.log("NEW REALESES", obs);
        return obs.pipe(map((data:any)=> data.artists.items))
      }).catch(()=>{
        this.token= null;
        this.getNewReleases();
      });
    // return this.getQuery(`search?q=${term}&type=artist`)
    //   .pipe(map((data:any)=> data.artists.items));
   
  }
  getArtist(term:string){
    return this.getQuery(`artists/${term}`);
   
  }
  getTopTracks(term:string){
    return this.getQuery(`artists/${term}/top-tracks?country=US`)
      .pipe(map(data=> data['tracks']));
  
  }
 async getToken(): Promise<any>{
    const clientSecret  = '764b7c0645b8490fa10f50f2a3450028';
    const clientId = '567b16bdfd234132942483002be41bc0';
    const url = 'http://127.0.0.1:3000/spotify/';    
    return await this._http.get(url + `${clientId}/${clientSecret}`).toPromise();
 
  

//  .then((data:any)=>{
//   console.log(data);
//   this.token = data.access_token;
//   this.tokenType = data.token_type;
//   console.log(this.tokenType + ' ' + this.token);
//  });
    
  }
}
