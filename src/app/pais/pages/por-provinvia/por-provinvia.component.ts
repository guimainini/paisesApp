import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-provinvia',
  templateUrl: './por-provinvia.component.html',
  styles: [
  ]
})
export class PorProvinviaComponent {

  termino : string    = '';
  provincia  : [] = [];
  provi : string[]      = [];
  provi2 : string = '';


  constructor( private buscarProvincia: PaisService  ) { }


  buscar( termino: string) {
    this.termino = termino;
    

    this.buscarProvincia.buscarProvincia( termino )
    .subscribe( (provincia) => {
      
      this.provincia = provincia;
      //console.log(this.provincia);
      
      //console.log(Object.values(this.provincia)); // convierto un objeto a un array
      this.provi = Object.values(this.provincia);
      console.log(typeof this.provi);
      this.provi2 = JSON.stringify(this.provi[3][0]);
      
      //console.log(typeof provincia) //object
      //console.log(typeof JSON.stringify(provincia)) //string

      //this.provi = JSON.parse(provincia);

    })
  }
  

}
