import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../usuario/usuario.service';
import { Observable } from 'rxjs/Rx';


@Component( {
    selector: 'app-inicio',
    templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
    usuarios:Usuario[];

    constructor(private usuarioService: UsuarioService ) { }

    ngOnInit() {
        
    }
}