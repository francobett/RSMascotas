
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { NuevaMascotaComponent } from './mascota/nueva-mascota.component';
import { MascotaComponent } from './mascota/mascota.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistrarUsuarioComponent } from './usuario/registrar-usuario.component';
import { MascotaMuroComponent } from "app/mascota/mascotamuro.component";
import { InicioComponent } from "app/inicio/inicio.component";

// Route Configuration
export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'perfilUsuario', component: PerfilComponent },
    { path: 'registrarUsuario', component: RegistrarUsuarioComponent },
    { path: 'mascotas', component: MascotaComponent },
    { path: 'muro/:id', component: MascotaMuroComponent },
    { path: 'nuevaMascota/:id', component: NuevaMascotaComponent },
    { path: 'nuevaMascota', component: NuevaMascotaComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot( routes );