package com.TechLab.spring;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TechLabSpringApplication {

	public static void main(String[] args) {
		// Cargar el archivo .env y setear la variable en el entorno del sistema
		Dotenv dotenv = Dotenv.load();
		String dbPassword = dotenv.get("SPRING_DATASOURCE_PASSWORD");

		if (dbPassword != null) {
			System.setProperty("SPRING_DATASOURCE_PASSWORD", dbPassword);
		}
		SpringApplication.run(TechLabSpringApplication.class, args);
	}

}
