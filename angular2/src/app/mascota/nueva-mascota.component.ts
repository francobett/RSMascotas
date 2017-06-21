import { Component, OnInit } from '@angular/core';
import { MascotaService, Mascota } from './mascota.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { DatePickerPipe } from '../tools/common-pipes.pipe';
import { DatePickerModule } from 'ng2-datepicker';
import { MomentService, Moment } from '../moments/moment.service'
@Component({
  selector: 'app-nueva-mascota',
  templateUrl: './nueva-mascota.component.html'
})
export class NuevaMascotaComponent implements OnInit {
  mascota: Mascota;
  errorMessage: string;
  formSubmitted: boolean;
  fileName: string;
  alertImg:string;
  errors: string[] = [];
  constructor(private mascotasService: MascotaService,
    private momentService: MomentService,
    private route: ActivatedRoute, private router: Router) {
    this.mascota = { id: null, nombre: '', fechaNacimiento: '', descripcion: '',imagen: ''};
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      if (id) {
        this.mascotasService.buscarMascota(id)
          .then(mascota => this.mascota = mascota)
          .catch(error => this.errorMessage = <any>error);
      }
    });


  }

  submitForm() {//Crear nueva mascota
    if (this.mascota.imagen == "" || this.mascota.imagen == undefined || this.mascota.imagen == null ){ this.alertImg = "Ingrese Imagen"}
    else {
    this.cleanRestValidations();
    this.mascotasService.guardarMascota(this.mascota)
      .then(mascota => this.router.navigate(['/mascotas']))
      .catch(error => this.procesarValidacionesRest(error));
    }
  }
  
  
  onDelete() { //Eliminar mascota con sus moments
    this.cleanRestValidations();
    this.mascotasService.eliminarMascota(this.mascota.id)
      .then(any => this.router.navigate(['/mascotas']))
      .catch(error => this.procesarValidacionesRest(error));
    
    this.momentService.getMoments()
      .then(moments =>  { 
        moments.forEach(momentI => {
          if (momentI.mascotaID == this.mascota.id) { //Si el moment es de la mascota, eliminamos el moment
            this.momentService.eliminarMoment(momentI.id)
          }
        });
      })
  }

  cleanRestValidations() {
    this.errorMessage = undefined;
    this.errors = [];
  }

  procesarValidacionesRest(data: any) {
    if (data.message) {
      for (const error of data.message) {
        this.errors[error.path] = error.message;
      }
    } else {
      this.errorMessage = data.message;
    }
  }
    //Cargar Imagen
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
     this.mascota.imagen = btoa(binaryString); //Guardar imagen cargada en mascota.imagen
  }


}
