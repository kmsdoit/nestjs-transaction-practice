import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "./domain/users.entity";
import {DataSource, Repository, Transaction} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

export class UsersRepository {

    constructor(
        @InjectRepository(Users) private readonly userRepository : Repository<Users>,
        private dataSource : DataSource
    ) {
    }

    async save(createUserDto : CreateUserDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction();

        const {email, password, name } = createUserDto;

        const user = new Users();
        user.email = email;
        user.password = password;
        user.name = name;

        try {
            await this.userRepository.save(user);
            await queryRunner.commitTransaction();
        }catch (err) {
            await queryRunner.rollbackTransaction();
        }finally {
            await queryRunner.release();
        }
    }

}
