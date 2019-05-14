import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

const artworks: {label: String, image: String, chip: String, category: String}[] = [
  {
    image:
    'https://upload.wikimedia.org/wikipedia/commons/0/04/Bernardino_Luini_-_Salome_with_the_Head_of_John_the_Baptist_-_WGA13772.jpg',
    label: 'Salome with the Head of John the Baptist',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image:
    'https://upload.wikimedia.org/wikipedia/commons/3/39/Leonardo_da_Vinci_-_Ginevra_de%27_Benci_-_Google_Art_Project.jpg',
    label: 'Ginevra de Benci',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Giampetrino-Leonardo.jpg',
    label: 'Maria Magdalena',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image:
    'https://upload.wikimedia.org/wikipedia/commons/9/91/Scuola_di_leonardo_da_vinci%2C_la_belle_ferroni%C3%A8re%2C_XVI_sec.JPG',
    label: 'La Belle Ferronière',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Lorenzo_di_Credi_-_Madonna_Dreyfus.jpg',
    label: 'Madonna and Child with a Pomegranate',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/The_Isleworth_Mona_Lisa.jpg',
    label: 'Isleworth Mona Lisa',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Leonardo_da_Vinci_attributed_-_Madonna_Litta.jpg',
    label: 'Madonna Litta',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image:
          'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo%2C_testa_di_cristo%2C_1494_circa%2C_pinacoteca_di_brera.jpg',
    label: 'Head of Christ',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    label: 'Mona Lisa',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image: 'https://www.leonardodavinci.net/images/gallery/the-virgin-of-the-rocks-louvre.jpg',
    label: 'The Virgin of the Rocks',
    chip: 'fas fa-palette',
    category: 'Artwork'
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Miguel_%C3%81ngel%2C_por_Daniele_da_Volterra_%28detalle%29.jpg',
    label: 'Michelangelo',
    chip: 'fas fa-user',
    category: 'Artist'
  }
]

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideElement: boolean = true;
  addtags: string[] = [];
  public model: any;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : artworks.filter(v => v.label.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => x.name;

  constructor() { }

  ngOnInit() {
  }

}