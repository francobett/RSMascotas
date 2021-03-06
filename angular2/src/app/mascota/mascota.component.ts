import { Component, OnInit } from '@angular/core';
import { MascotaService, Mascota } from './mascota.service'
import { Observable } from 'rxjs/Rx';


@Component( {
    selector: 'app-mascota',
    templateUrl: './mascota.component.html',
    styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {
    errorMessage: string;
    mascotas: Mascota[];

    constructor( private mascotasService: MascotaService ) { }
    
    // Obtener todas las Mascotas del Usuario Logeado
    ngOnInit() {
        this.mascotasService.buscarMascotas()
          .then(mascotas => this.mascotas = mascotas)
          .catch(error => this.errorMessage = <any>error );
    }
}
