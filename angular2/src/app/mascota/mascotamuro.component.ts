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
    templateUrl: './mascotamuro.component.html',
    styleUrls: ['./mascotamuro.component.css']
})
export class MascotaMuroComponent implements OnInit {
    errorMessage: string;
    
    mascotaDescripcion: string
    
    //Atributos para Guardar el Moment
    
    mascotaNombre: string;
    mascotaID: number;
    titulo: string;
    descripcion: string;
    usuario: string;

    currentUrl: string ;

    imagen: string;
    cargarImagen = "Cargar Imagen";
    fileName: string;
    //Moment a Mostrar
    moments: Moment[];
    mascotaActualImagen: string;
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
          .then(mascotaActual => {this.mascotaNombre = mascotaActual.nombre,
          this.mascotaActualImagen = mascotaActual.imagen  ,
          this.mascotaDescripcion = mascotaActual.descripcion
        })
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
      //Si es vacio o nulo no hacer nada el titulo o descripción
      if (this.titulo == ""
          || this.titulo == undefined
          || this.titulo == null  
          ||this.descripcion == "" 
           || this.descripcion == undefined
            || this.descripcion == null ) {} 
      else {
        this.titulo = this.titulo.trim();//Eliminar espacios innecesarios en título
        let moment: Moment = {
            id: null,
            titulo: this.titulo,
            descripcion: this.descripcion,
            mascotaID: this.mascotaID,
            mascotaNombre: this.mascotaNombre,
            usuario: this.usuario,
            fecha: Date.now(),
            imagenMoment: this.imagen?this.imagen:"",
            mascotaImagen: this.mascotaActualImagen
        };
        this.newMoment(moment);
        //Recargar Página
        window.location.reload();
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

  cargar(event){
      var files = event.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);

        this.fileName = file.name;
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
     this.imagen = btoa(binaryString);
  }

  onDelete(id:number){
    this.momentService.eliminarMoment(id)
      .then(any => window.location.reload())
      
  }
}
