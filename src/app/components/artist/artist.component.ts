import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
  
})
export class ArtistComponent implements OnInit {
  artist:any={};
  topTracks:any[]=[];
  loading:boolean;

  constructor(
    private router:ActivatedRoute,
    private spotifyService:SpotifyService
  ) {
    this.loading=true;
    this.router.params.subscribe(params=>{     
      let id = params['id'];
      spotifyService
        .getArtist(id).subscribe(data=>{
        this.artist=data;
        this.loading =false;
      });
      spotifyService.getTopTracks(id).subscribe((data:any)=>{
        console.log(data);
        this.topTracks =data;
      })
      
    });
   }

  ngOnInit(): void {
  }

}
