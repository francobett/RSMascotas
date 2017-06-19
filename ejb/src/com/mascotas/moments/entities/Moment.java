package com.mascotas.moments.entities;
import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OrderColumn;


import com.mascotas.mascotas.entities.Mascota;
import com.mascotas.seguridad.entities.Usuario;

@Entity(name = "moment")
public class Moment implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OrderColumn()
	@Column(nullable = false)
	private String titulo;
	
	@OrderColumn()
	@Column(nullable = false)
	private String descripcion;
	
	@OrderColumn()
	@Column(nullable = false)
	private Integer mascotaID;
	
	@OrderColumn()
	@Column(nullable = false)
	private String mascotaNombre;
	
	@OrderColumn()
	@Column(nullable = false)
	private String usuario;
	
	@OrderColumn()
	@Column(nullable = false)
	private Long fecha;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public Integer getMascotaID() {
		return mascotaID;
	}

	public void setMascotaID(Integer mascotaID) {
		this.mascotaID = mascotaID;
	}
	
	public String getMascotaNombre() {
		return mascotaNombre;
	}

	public void setMascotaNombre(String mascotaNombre) {
		this.mascotaNombre = mascotaNombre;
	}
	
	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	
	public Long getFecha() {
		return fecha;
	}

	public void setFecha(Long fecha) {
		this.fecha = fecha;
	}
}
