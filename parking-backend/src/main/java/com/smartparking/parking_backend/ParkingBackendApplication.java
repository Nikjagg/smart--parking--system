package com.smartparking.parking_backend;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableScheduling

public class ParkingBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParkingBackendApplication.class, args);
		

	
	}

}
