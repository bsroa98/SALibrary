package config;
import com.azure.spring.data.cosmos.config.AbstractCosmosConfiguration;
import com.azure.spring.data.cosmos.core.mapping.CosmosMappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CosmosDbConfig extends AbstractCosmosConfiguration {

    @Bean
    public CosmosMappingContext cosmosMappingContext() {
        return new CosmosMappingContext();
    }

    @Override
    protected String getDatabaseName() {
        return "items";
    }
}
