package com.kashyap.clinicals.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kashyap.clinicals.dto.ClinicalDataRequest;
import com.kashyap.clinicals.model.ClinicalData;
import com.kashyap.clinicals.model.Patient;
import com.kashyap.clinicals.repos.ClinicalDataRepository;
import com.kashyap.clinicals.repos.PatientRepository;
import com.kashyap.clinicals.util.BMICalculator;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ClinicalDataController {
	private ClinicalDataRepository crepo;
	private PatientRepository prepo;

	ClinicalDataController(ClinicalDataRepository crepo, PatientRepository prepo) {
		this.crepo = crepo;
		this.prepo = prepo;
	}

	@RequestMapping(value = "/clinicals", method = RequestMethod.POST)
	public ClinicalData saveClinicalData(@RequestBody ClinicalDataRequest req) {
		Patient patient = prepo.findById(req.getPatientId()).get();
		ClinicalData cd = new ClinicalData();
		cd.setComponentName(req.getComponentName());
		cd.setComponentValue(req.getComponentValue());
		cd.setPatient(patient);
		return crepo.save(cd);

	}

	@RequestMapping(value = "/clinicals/{patientId}/{componentName}", method = RequestMethod.GET)
	public List<ClinicalData> getClinicalData(@PathVariable("patientId") int id,
			@PathVariable("componentName") String componentName) {
		
		if(componentName.equals("bmi")) {
			componentName="hw";
		}

		List<ClinicalData> cd = crepo
				.findByPatientIdAndComponentNameOrderByMeasuredDateTime(id, componentName);
		List<ClinicalData>cd2 = new ArrayList<>(cd);
		for(ClinicalData x: cd2) {
			BMICalculator.calculateBMI(cd, x);
		}
		return cd;

	}

}
