package com.mascotas.moments.repository;
import java.util.List;
import java.util.ArrayList;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.mascotas.application.repository.Repositorio;
import com.mascotas.moments.entities.Moment;
@Stateless
@LocalBean
public class MomentRepository implements Repositorio<Integer, Moment>{
	@PersistenceContext(unitName = "MascotasDS")
	private EntityManager entityManager;

	@Override
	public void add(Moment newOne) {
		entityManager.persist(newOne);
	}

	@Override
	public void remove(Moment toDelete) {
		entityManager.remove(toDelete);
	}

	@Override
	public Moment get(Integer id) {
		return entityManager.find(Moment.class, id);
	}

	@Override
	public List<Moment> getAll() {
		throw new RuntimeException("No se puede acceder a todos los estados.");
	}
	

	public List<Moment> getMoments() {
		String q = "SELECT p from moment p ORDER BY fecha DESC";
		TypedQuery<Moment> query = entityManager.createQuery(q, Moment.class);
		return query.getResultList();
	}

	@Override
	public long size() {
		String q = "SELECT count(p) from " + Moment.class.getName() + " p";
		return (Long) entityManager.createQuery(q).getSingleResult();
	}

	
}
