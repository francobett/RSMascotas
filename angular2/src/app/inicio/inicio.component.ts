import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../usuario/usuario.service';
import { Observable } from 'rxjs/Rx';
import { MomentService,Moment } from "app/moments/moment.service";
import { MascotaService, Mascota } from "app/mascota/mascota.service";


@Component( {
    selector: 'app-inicio',
    templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
    errorMessage: string;

    moments: Moment[];
    
    constructor(private usuarioService: UsuarioService,
    private momentService: MomentService,
    private mascotasService: MascotaService ) { }

    ngOnInit() {
        //Traer todos los momentos
        this.momentService.getMoments().
        then (moments => {this.moments = moments
        })
        .catch(error => this.errorMessage = <any>error);
        
        //Traer Imagen Mascota 


    }
}