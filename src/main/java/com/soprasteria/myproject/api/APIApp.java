package com.soprasteria.myproject.api;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class APIApp {
    public static void main(String[] args) {
        SpringApplication.run(APIApp.class, args);
    }
}

/*
public class APIApp implements CommandLineRunner {
	public static void main (String[] args) {
		SpringApplication.run(APIApp.class, args);

	}

	@Override
	public void run(String... args) throws Exception {
	}
}
*/
