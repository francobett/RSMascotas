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
import com.mascotas.application.utils.StringUtils;
import com.mascotas.mascotas.dto.MascotaDTO;
import com.mascotas.mascotas.entities.Mascota;
import com.mascotas.mascotas.repository.MascotaRepository;
import com.mascotas.moments.dto.MomentDTO;
import com.mascotas.moments.entities.Moment;
import com.mascotas.moments.repository.MomentRepository;
import com.mascotas.seguridad.entities.Usuario;
import com.mascotas.seguridad.repository.UsuariosRepository;
@Stateless
@LocalBean
@TransactionManagement(TransactionManagementType.CONTAINER)
public class MomentService {
	@EJB
	private MascotaRepository mascotaRepository;
	@EJB
	private MomentRepository momentRepository;
	
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
		momentRepository.add(newMoment);
	}

	public List<MomentDTO> findMoments() throws BusinessException {
		List<Moment> moment = momentRepository.getMoments();

		return MomentDTO.Factory.get(moment);
	}
}
