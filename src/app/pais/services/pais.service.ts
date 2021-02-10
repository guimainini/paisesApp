import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  
  private apiUrl:string = 'https://restcountries.eu/rest/v2';
  private apiUrlGobiernoProvincia: string = 'https://apis.datos.gob.ar/georef/api/provincias?nombre=';


  
  get httpParams () {
    return new HttpParams()
    .set( 'fields', 'name;capital;alpha2Code;flag;population' )
  }
  
  
  constructor( private http: HttpClient ) { }

  

  buscarPais ( termino: string ): Observable<Country[]> {
    
    const url = `${ this.apiUrl }/name/${ termino }`;

    
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  buscarCapital ( termino: string ): Observable<Country[]>{

    const url = `${ this.apiUrl }/capital/${ termino }`;

    return this.http.get<Country[]>( url, { params: this.httpParams } );

  }

  

  getPaisPorAlpha ( id: string ): Observable<Country>{

    const url = `${ this.apiUrl }/alpha/${ id }`;

    return this.http.get<Country>( url );

  }

  buscasRegion ( region: string ): Observable<Country[]>{

    
    
    const url = `${ this.apiUrl }/region/${ region }`;

    return this.http.get<Country[]>( url, { params: this.httpParams } )
            .pipe(
              tap(console.log)
            )
    
  }

  buscarProvincia ( provincia: string ){
    
    const url = `${this.apiUrlGobiernoProvincia}${provincia}`;
    
    return this.http.get( url)
            .pipe(
              tap(console.log)
            )
  }


}
