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

	private Integer id;
	private String titulo;
	private String descripcion;
	private Integer mascotaID; 
	private String mascotaNombre; 
	private String usuario;
	private Long fecha;
	private String imagenMoment;
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

	public void setImagen(String imagenMoment) {
		this.imagenMoment = imagenMoment;
	}
	
	public static class Factory {
		public static MomentDTO get(Moment moment) {
			MomentDTO result = new MomentDTO();
			result.id = moment.getId();
			result.titulo = moment.getTitulo();
			result.descripcion = moment.getDescripcion();
			result.mascotaID = moment.getMascotaID();
			result.mascotaNombre = moment.getMascotaNombre();
			result.usuario = moment.getUsuario();
			result.fecha = moment.getFecha();
			result.imagenMoment = moment.getImagenMoment();
			result.mascotaImagen = moment.getMascotaImagen();
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
