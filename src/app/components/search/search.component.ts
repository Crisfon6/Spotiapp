import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  artists:any[] = [];
  loading:boolean;
  constructor(
    private _spotifyService:SpotifyService
  ) {
    
   }

  ngOnInit(): void {
  }
  search(term:string){
    this.loading=true;
    this._spotifyService.getArtists(term).subscribe(data=>{
      this.artists=data;
      this.loading=false;
    })
  }
}
