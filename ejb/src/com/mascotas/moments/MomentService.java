package com.mascotas.moments;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;

import com.mascotas.application.exceptions.BusinessException;

import com.mascotas.mascotas.repository.MascotaRepository;
import com.mascotas.moments.dto.MomentDTO;
import com.mascotas.moments.entities.Moment;
import com.mascotas.moments.repository.MomentRepository;

@Stateless
@LocalBean
@TransactionManagement(TransactionManagementType.CONTAINER)
public class MomentService {
	@EJB
	private MascotaRepository mascotaRepository;
	@EJB
	private MomentRepository momentRepository;
	
	/* Servicio que crea recibe un DTO de Moment
	 * Luego crea un moment con los datos del DTO
	 * y por ultimo llama al repository para que lo a�ada a la base de datos*/
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void newMoment(MomentDTO moment) throws BusinessException {
		Moment newMoment = new Moment();
		newMoment.setId(moment.getId());
		newMoment.setTitulo(moment.getTitulo());
		newMoment.setDescripcion(moment.getDescripcion());
		newMoment.setMascotaID(moment.getMascotaID());
		newMoment.setMascotaNombre(moment.getMascotaNombre());
		newMoment.setUsuario(moment.getUsuario());
		newMoment.setFecha(moment.getFecha());
		newMoment.setImagenMoment(moment.getImagenMoment());
		newMoment.setMascotaImagen(moment.getMascotaImagen());
		momentRepository.add(newMoment);
	}

	public List<MomentDTO> findMoments() throws BusinessException {
		List<Moment> moment = momentRepository.getMoments();

		return MomentDTO.Factory.get(moment);
	}
	
	public void eliminarMoment(Integer id) {

		momentRepository.remove(momentRepository.get(id));
	}
}
