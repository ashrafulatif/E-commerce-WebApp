import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'e-commerce-webapp',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',

  entities: [User],
  synchronize: true,
};
