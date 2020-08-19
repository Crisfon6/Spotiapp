import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newSongs:any[] = [];
  loading:boolean;
  error:boolean;
  errorMsg:string='';
  constructor(
    private spotifyService: SpotifyService
  ) { 
    this.error=false;
    this.loading =true;

    this.spotifyService.getNewReleases().subscribe((data:any)=>{
      
      this.newSongs= data;
      this.loading=false;
    },(err:any)=>{
      console.log("error component");
      this.error=true;
      this.loading=false;
      this.errorMsg = err.error.error.message;
    });
  }

  ngOnInit(): void {

  }

}
