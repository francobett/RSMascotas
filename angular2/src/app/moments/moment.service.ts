import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import { Mascota } from '../mascota/mascota.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class MomentService extends RestBaseService {
    private url = '/rest/moment';
    
    constructor(private http: Http) { super(); }
//Obtener Moments -- service
getMoments(): Promise<Moment[]> {
    return this.http
      .get(
        MomentService.serverUrl + this.url, this.getRestHeader()
      )
      .toPromise()
      .then(
        response => {
          return response.json() as Moment[];
        }
      )
      .catch(this.handleError);

     
      
  }
//Crear Moment -- service
  newMoment(moment: Moment) {
    this.http
      .post(
        MomentService.serverUrl + this.url,
        JSON.stringify(moment),
        this.getRestHeader()
      )
      .toPromise()
      .then()
      .catch();
      console.log(MomentService.serverUrl + this.url)
  }
// Eliminar Moment según id -- service
  eliminarMoment(id: number): Promise<any> {
    if (id) {
      return this.http.delete(MomentService.serverUrl + this.url + '/' + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return "";
      })
      .catch(this.handleError);
    }
  }

}

// Class Moment.
export interface Moment {
  id: number;
  titulo: string;
  descripcion: string;
  mascotaID: Number;
  mascotaNombre: string;
  mascotaImagen: string;
  usuario: string;
  fecha: number;
  imagenMoment: string;
}