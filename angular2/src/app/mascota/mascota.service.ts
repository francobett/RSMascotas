import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MascotaService extends RestBaseService {
  private url = '/rest/mascota';

  constructor(private http: Http) { super(); }

  // Buscar Mascotas Usuario Logeado -- El Usuario se obtiene en el backend -- service
  buscarMascotas(): Promise<Mascota[]> {
    return this.http.get(MascotaService.serverUrl + this.url, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Mascota[];
      })
      .catch(this.handleError);
  }

  // Buscar mascota según id -- service
  buscarMascota(id: number): Promise<Mascota> {
    return this.http.get(MascotaService.serverUrl + this.url + '/' + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Mascota;
      })
      .catch(this.handleError);
      
  }

  // Persistir mascota -- service
  guardarMascota(value: Mascota): Promise<Mascota> {
    if (value.id) {
      return this.http.post(MascotaService.serverUrl + this.url + '/' + value.id, JSON.stringify(value), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Mascota;
      })
      .catch(this.handleError);
    } else {
      return this.http.post(MascotaService.serverUrl + this.url, JSON.stringify(value), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Mascota;
      })
      .catch(this.handleError);
    }
  }

  // Eliminar Mascota -- service
  eliminarMascota(id: number): Promise<any> {
    if (id) {
      return this.http.delete(MascotaService.serverUrl + this.url + '/' + id, this.getRestHeader())
      .toPromise()
      .then(response => {
        return "";
      })
      .catch(this.handleError);
    }
  }
    

}
//Class Mascota
export interface Mascota {
  id: number;
  nombre: string;
  fechaNacimiento: string;
  descripcion: string;
  imagen: string;
}
