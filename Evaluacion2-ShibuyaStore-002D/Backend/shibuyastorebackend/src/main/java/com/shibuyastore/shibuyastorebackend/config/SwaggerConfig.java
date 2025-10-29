package com.shibuyastore.shibuyastorebackend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Configuración para Swagger
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("ShibuyaStore API")
                        .version("1.0")
                        .description("API REST para la gestión de la tienda ShibuyaStore"));
    }
}