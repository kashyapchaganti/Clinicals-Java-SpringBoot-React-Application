package com.kashyap.clinicals.util;

import java.util.List;

import com.kashyap.clinicals.model.ClinicalData;

public class BMICalculator {
	
	public static void calculateBMI(List<ClinicalData> cd, ClinicalData x) {
		if(x.getComponentName().equals("hw")) {
			String[] x1 = x.getComponentValue().split("/");
			float heightInMts= Float.parseFloat(x1[0])*0.4536F;
			float bmi= Float.parseFloat(x1[1])/(heightInMts*heightInMts);
			ClinicalData bmiData = new ClinicalData();
			bmiData.setComponentName("bmi");
			bmiData.setComponentValue(Float.toString(bmi));
			cd.add(bmiData);
		}
	}

}
