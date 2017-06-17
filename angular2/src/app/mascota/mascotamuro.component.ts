import { Component, OnInit } from '@angular/core';
import { MomentService, Moment } from '../moments/moment.service'
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario.service';
import { MascotaService } from '../mascota/mascota.service';
import { Mascota } from '../mascota/mascota.service';

@Component( {
    selector: 'app-mascotaMuro',
    templateUrl: './mascotaMuro.component.html'
})
export class MascotaMuroComponent implements OnInit {
    errorMessage: string;
    mascotaNombre: string;
    titulo: string;
    descripcion: string;
    moments: Moment[];
    currentUrl: string ;
    constructor( 
        private momentService: MomentService,
        private route: ActivatedRoute, 
        private usuarioService: UsuarioService,
        private router: Router,
        private mascotasService: MascotaService
    ) { }

    ngOnInit() {
        // Obtener ID de mascota a través de la ruta
        this.currentUrl = this.router.url;

        //Traer Nombre Mascota según ID , se parsea a Number
        this.mascotasService.buscarMascota(Number(this.currentUrl.substring(6)))
        .then(mascota => {
          this.mascotaNombre = mascota.nombre;
        })
        .catch(error => this.errorMessage = <any>error );
        //Traer Momentos
        this.getMoments();
    }
    //Crear nuevo Moment y Actualizar la lista al presionar Guardar
    submitForm() {
    if (this.titulo != undefined) {
      this.titulo = this.titulo.trim();
    }
    if (this.titulo != undefined) {
      this.titulo = this.titulo.trim();
    }
    try {
      if (this.titulo == ""
          || this.titulo == undefined
          || this.titulo == null) {
      } else {
        this.titulo = this.titulo.trim();
        let moment: Moment = {
            titulo: this.titulo,
            descripcion: this.descripcion,
            mascota: this.mascotaNombre
        };
        this.newMoment(moment);
        //Actualizar Moments, agregando el nuevo
        setTimeout(() => this.getMoments(), 500);
        //Reiniciar campos
        this.titulo = undefined;
        this.descripcion = undefined;
      }
    }
    catch(e){
      return false;
    };
  }
//Crear nuevo Moment
    newMoment(moment: Moment) {
    this.momentService.newMoment(moment);
  }
/* Obtener moments. Se obtienen todos pero en html 
se hace la validación para mostrar solos los de la mascota actual*/
    getMoments() {
    this.momentService.getMoments()
      .then(moments => this.moments = moments)
      .catch(error => this.errorMessage = error);

  }
}
