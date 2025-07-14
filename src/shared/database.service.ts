import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor(private configService: ConfigService) {
        const config = {
            user: this.configService.get<string>('DB_USER'),
            host: this.configService.get<string>('DB_HOST'),
            database: this.configService.get<string>('DB_NAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            port: this.configService.get<number>('DB_PORT', 5432),
            ssl: {
                rejectUnauthorized: false
            }
        };
        
        /*
        console.log('Configuração do banco:', {
            user: config.user,
            host: config.host,
            database: config.database,
            password: config.password ? '***HIDDEN***' : 'NOT_FOUND',
            port: config.port
        });
        */
       
        this.pool = new Pool(config);
    }

    // Funcão para conexão com banco de dados por queries.
    async query(text: string, params?: any[]): Promise<any> {
        const client = await this.pool.connect();
        try {
            const result = await client.query(text, params);
            return result;
        } finally {
            client.release();
        }
    }
} 