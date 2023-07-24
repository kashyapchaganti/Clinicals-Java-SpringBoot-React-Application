package com.kashyap.clinicals.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kashyap.clinicals.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

}
