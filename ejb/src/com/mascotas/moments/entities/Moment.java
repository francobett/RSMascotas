package com.mascotas.moments.entities;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import javax.persistence.OrderColumn;



@Entity(name = "moment")
public class Moment implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
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
	
	// Lob indica la columna es de tipo LONGTEXT
	
	@Lob
	@OrderColumn()
	@Column(nullable = false)
	private String imagenMoment;
	
	@Lob
	@OrderColumn()
	@Column(nullable = false)
	private String mascotaImagen;

	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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
	public String getMascotaImagen() {
		return mascotaImagen;
	}

	public void setMascotaImagen(String mascotaImagen) {
		this.mascotaImagen = mascotaImagen;
	} 

	public String getImagenMoment() {
		return imagenMoment;
	}

	public void setImagenMoment(String imagenMoment) {
		this.imagenMoment = imagenMoment;
	}
}
