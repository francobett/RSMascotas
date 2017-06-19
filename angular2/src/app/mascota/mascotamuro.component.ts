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
    //Atributos para Guardar el Moment
    mascotaNombre: string;
    mascotaID: number;
    titulo: string;
    descripcion: string;
    usuario: string;

    currentUrl: string ;

    //Moment a Mostrar
    moments: Moment[];
    
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
        this.mascotaID = Number(this.currentUrl.substring(6));
        //Traer Nombre Mascota según ID , se parsea a Number
        this.mascotasService.buscarMascota( this.mascotaID)
          .then(mascotaActual => this.mascotaNombre = mascotaActual.nombre)
          .catch(error => this.errorMessage = <any>error);
        //Traer Momentos
        this.getMoments();
        //Traer Usuario
        this.usuarioService.getPrincipal()
        .then(usuario => this.usuario = usuario.login)
        .catch(error => this.errorMessage = <any>error);
    }
    //Crear nuevo Moment y Actualizar la lista al presionar Guardar
    submitForm() {
    try {
      //Si es vacio o nulo no hacer nada
      if (this.titulo == ""
          || this.titulo == undefined
          || this.titulo == null) {} 
      else {
        this.titulo = this.titulo.trim();//Eliminar espacios innecesarios en título
        let moment: Moment = {
            titulo: this.titulo,
            descripcion: this.descripcion,
            mascotaID: this.mascotaID,
            mascotaNombre: this.mascotaNombre,
            usuario: this.usuario,
            fecha: Date.now()
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
