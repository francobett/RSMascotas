package com.mascotas.moments.dto;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;


import com.mascotas.moments.entities.Moment;
@JsonIgnoreProperties(ignoreUnknown = true)
public class MomentDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String titulo;
	private String descripcion;
	private String mascota; 
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
	public String getMascota() {
		return mascota;
	}

	public void setMascota(String mascota) {
		this.mascota = mascota;
	}
	
	public static class Factory {
		public static MomentDTO get(Moment moment) {
			MomentDTO result = new MomentDTO();
			result.id = moment.getId();
			result.titulo = moment.getTitulo();
			result.descripcion = moment.getDescripcion();
			result.mascota = moment.getMascota();
			return result;
		}

		public static List<MomentDTO> get(Collection<Moment> moment) {
			ArrayList<MomentDTO> result = new ArrayList<MomentDTO>();
			for (Moment p : moment) {
				result.add(get(p));
			}
			return result;
		}

	}

}
