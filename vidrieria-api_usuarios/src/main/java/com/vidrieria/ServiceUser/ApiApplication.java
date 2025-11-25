package com.vidrieria.ServiceUser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableDiscoveryClient
@EnableSpringDataWebSupport
@EnableAsync
public class ApiApplication {
    public static void main(String[] args) {

        SpringApplication.run(ApiApplication.class, args);
    }
}