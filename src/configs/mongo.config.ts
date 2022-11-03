import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

const getMongoOptions = (configService: ConfigService) => {
    return {};
};

const getMongoString = (configService: ConfigService) => {
    const connectionString =
        'mongodb://' +
        configService.get('DB_LOGIN') +
        ':' +
        configService.get('DB_PASSWORD') +
        '@' +
        configService.get('DB_HOST') +
        ':' +
        configService.get('DB_PORT') +
        '/' +
        configService.get('DB_AUTH');

    return connectionString;
};

export const getMongoConfig = async (
    configService: ConfigService
): Promise<MongooseModuleOptions> => ({
    uri: getMongoString(configService),
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});
