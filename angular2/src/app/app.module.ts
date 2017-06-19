import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsuarioService } from './usuario/usuario.service';
import { ProvinciaService } from './provincia/provincia.service';
import { PerfilService } from './perfil/perfil.service';
import { PerfilComponent } from './perfil/perfil.component';
import { MascotaComponent } from './mascota/mascota.component';
import { MenuComponent } from './menu/menu.component';
import { NuevaMascotaComponent } from './mascota/nueva-mascota.component';
import { MascotaService } from './mascota/mascota.service';
import { environment } from '../environments/environment';
import { DatePickerPipe } from './tools/common-pipes.pipe';
import { RegistrarUsuarioComponent } from './usuario/registrar-usuario.component';
import { DatePickerModule } from 'ng2-datepicker';
import { LOCALE_ID } from '@angular/core';
import { MascotaMuroComponent } from "app/mascota/mascotamuro.component";
import { InicioComponent } from "app/inicio/inicio.component";
import { MomentService } from "app/moments/moment.service";

@NgModule({
  declarations: [
    AppComponent,
    DatePickerPipe,
    WelcomeComponent,
    InicioComponent,
    PerfilComponent,
    MascotaComponent,
    MenuComponent,
    NuevaMascotaComponent,
    RegistrarUsuarioComponent,
    MascotaMuroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    DatePickerModule,
    routing
  ],
  providers: [
  MomentService,
  MascotaService, 
  UsuarioService, 
  ProvinciaService,
  PerfilService, 
  { provide: APP_BASE_HREF, useValue: environment.baseHref },
  { provide: LOCALE_ID, useValue: "es-AR" }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
