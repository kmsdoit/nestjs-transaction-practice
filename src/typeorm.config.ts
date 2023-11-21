import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const TypeormConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 't2v',
    password : 'idb1004#',
    database : 't2v',
    entities : [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize : true,
    logging : true
}

