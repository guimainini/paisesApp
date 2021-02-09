import { Component, resolveForwardRef } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li{
    cursor: pounter;
  }
`
  ]
})
export class PorPaisComponent{

  termino : string    = '';
  hayError: boolean   = false;
  paises  : Country[] = [];

  paisesSugeridos    : Country[] = [];
  mostrarSugerencias : boolean   = false;

  constructor( private paisService: PaisService ) { }

  buscar( termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    

    this.paisService.buscarPais( termino )
    .subscribe( (paises) => {
      
      this.paises = paises;


      console.log(paises);

    }, (err) =>{
      this.hayError = true;
      this.paises   = [];
    } )
  }

  sugerencias( termino: string ) {
    this.hayError = false;
    this.termino  = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
      .subscribe 
      ( paises => this.paisesSugeridos = paises.splice(0,5), 
      (err) => this.paisesSugeridos = []
      );

  }

  buscaSugerido ( termino: string ){
    this.buscar( termino );
    
  }

}
