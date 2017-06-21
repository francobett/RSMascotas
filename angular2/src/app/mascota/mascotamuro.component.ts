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
    currentUrl: string ;

    mascotaDescripcion: string
    mascotaActualImagen: string;

    //Atributos para Guardar el Moment   
    mascotaNombre: string;
    mascotaID: number;
    titulo: string;
    descripcion: string;
    usuario: string;
    imagen: string; // Imagen del moment

    // Para la carga de imagenes
    fileName: string;

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
        this.mascotaID = Number(this.currentUrl.substring(6)); // Parsear a number

        //Traer Nombre Mascota(nombre,imagen,descripcion) según ID 
        this.mascotasService.buscarMascota( this.mascotaID)
          .then(mascotaActual => {this.mascotaNombre = mascotaActual.nombre,
          this.mascotaActualImagen = mascotaActual.imagen,
          this.mascotaDescripcion = mascotaActual.descripcion
        })
          .catch(error => this.errorMessage = <any>error);

        //Llamar metodo del component que llama al servicio para traer los moments
        this.getMoments();

        //Traer Usuario
        this.usuarioService.getPrincipal()
        .then(usuario => this.usuario = usuario.login)
        .catch(error => this.errorMessage = <any>error);
    }

    //Crear nuevo Moment y refrescar la página cuando se cree

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
          this.titulo = this.titulo.trim(); //Eliminar espacios innecesarios en título
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
          this.momentService.newMoment(moment); // Llamar servicio para persistir nuevo moment
          //Recargar Página
          window.location.reload();
        }
      }
      catch(e){
        return false;
      };
    }

    /* Obtener moments. Se obtienen todos pero en html 
    se hace la validación para mostrar solos los de la mascota actual*/
    getMoments() {
      this.momentService.getMoments()
        .then(moments => this.moments = moments)
        .catch(error => this.errorMessage = error);

    }

    // Eliminar Moment y refrescar pagina
    onDelete(id:number){
      this.momentService.eliminarMoment(id)
      .then(any => window.location.reload())
        
    }

    // Evento para la carga de imagenes
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
      this.imagen = btoa(binaryString); // Guardar imagen del moment cargada en this.imagen
    }

}
