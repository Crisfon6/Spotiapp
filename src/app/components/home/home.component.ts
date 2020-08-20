import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Observable } from 'rxjs';


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
    
  }

 async ngOnInit() {
  this.error=false;
  this.loading =true;

  // await this.spotifyService.getNewReleases();
  await this.spotifyService.getNewReleases().then((d:Observable<any>)=>{
    console.log("COMOPONENT",d);
    d.subscribe(data=>{
          this.newSongs= data;
    this.loading=false;
    },(err:any)=>{
          this.error=true;
    this.loading=false;
    this.errorMsg = err.error.error.message;
    });
  });

  
  }

}
