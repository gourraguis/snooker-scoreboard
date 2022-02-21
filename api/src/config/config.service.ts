import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as dotenv from 'dotenv'
import { join } from 'path'

export enum DeploymentEnvironmentTypes {
  PRODUCTION = 'PRODUCTION',
  DEVELOPMENT = 'DEVELOPMENT',
}

export class ConfigService {
  private readonly envConfig: { [key: string]: string }

  constructor() {
    dotenv.config()
    this.envConfig = process.env
  }

  get(key: string): string {
    const value = this.envConfig[key]
    if (!value) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value
  }

  getDeploymentEnvironment(): DeploymentEnvironmentTypes {
    return this.get('DEPLOYMENT_ENVIRONMENT') as DeploymentEnvironmentTypes
  }

  public isProduction() {
    return this.getDeploymentEnvironment() === DeploymentEnvironmentTypes.PRODUCTION
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },

      host: this.get('POSTGRES_HOST'),
      port: parseInt(this.get('POSTGRES_PORT')),
      username: this.get('POSTGRES_USER'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),

      entities: [join(__dirname, '/../', '**', '/*.entity.{ts,js}')],

      namingStrategy: new SnakeNamingStrategy(),

      migrationsTableName: 'migrations',

      migrations: [join(__dirname, '/../', '/migrations/*.{ts,js}')],

      cli: {
        migrationsDir: join(__dirname, '/../', '/migrations'),
      },
    }
  }

  public getJwtSecret() {
    return this.get('JWT_SECRET')
  }

  public getCreateOwnerSecret() {
    return this.get('CREATE_OWNER_SECRET')
  }
}
