package com.kashyap.clinicals.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kashyap.clinicals.model.ClinicalData;
import com.kashyap.clinicals.model.Patient;
import com.kashyap.clinicals.repos.PatientRepository;
import com.kashyap.clinicals.util.BMICalculator;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PatientController {
	private PatientRepository repo;
	private Map<String,String> filter = new HashMap<>();
	@Autowired
	PatientController(PatientRepository repo){
		this.repo= repo;
	}
	
	@RequestMapping(value="/patients", method= RequestMethod.GET)
	public List<Patient> getPatients(){
		return repo.findAll();
	}
	
	@RequestMapping(value="/patients/{id}", method= RequestMethod.GET)
	public Patient getPatient(@PathVariable("id") int id) {
		return repo.findById(id).get();
	}
	
	@RequestMapping(value="/patients", method= RequestMethod.POST)
	public Patient savePatient(@RequestBody Patient patient) {
		return repo.save(patient);
		
	}
	@RequestMapping(value="/patients/analyze/{id}", method= RequestMethod.GET)
	public Patient analyze( @PathVariable("id") int id) {
		Patient patient = repo.findById(id).get();
		List<ClinicalData>cd= patient.getClinicalData();
		List<ClinicalData>cd2 = new ArrayList<>(cd);
		for(ClinicalData x: cd2) {
			if(filter.containsKey(x.getComponentName())) {
				cd.remove(x);
				continue;
			}else {
				filter.put(x.getComponentName(), null);
			}
			BMICalculator.calculateBMI(cd, x);
		}
		filter.clear();
		return patient;
	}


}
