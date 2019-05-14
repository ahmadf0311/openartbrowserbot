import { Component, OnInit, OnDestroy } from '@angular/core';
import { Artist, Artwork } from 'src/app/shared/models/models';
import { DataService } from 'src/app/core/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit, OnDestroy {
  /** use this to end subscription to url parameter in ngOnDestroy */
  private ngUnsubscribe = new Subject();

  /** The entity this page is about */
  artist: Artist = null;

  /** Related artworks */
  sliderItems: Artwork[] = [];

  /** Change collapse icon */
  collapseDown: boolean = true;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  toggleDetails() {
    this.collapseDown = !this.collapseDown;
  }

  /** hook that is executed at component initialization */
  ngOnInit() {
    /** Extract the id of entity from URL params. */
    this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(async (params) => {
      const artistId = params.get('artistId');
      /** Use data service to fetch entity from database */
      this.artist = (await this.dataService.findById(artistId)) as Artist;
      this.sliderItems = await this.dataService.findArtworksByArtists([this.artist.id]);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}