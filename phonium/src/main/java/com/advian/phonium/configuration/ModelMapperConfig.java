package com.advian.phonium.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for setting up ModelMapper as a Spring Bean.
 */
@Configuration
public class ModelMapperConfig {

    /**
     * Creates and provides a ModelMapper bean for object mapping.
     *
     * @return A configured ModelMapper instance.
     */
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
