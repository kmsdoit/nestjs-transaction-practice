import {Repository} from "typeorm";
import {UsersService} from "./users.service";
import {Users} from "./domain/users.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, TypeOrmModule} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

const MockUserRepository = () => ({
    find : jest.fn()
})

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
    let service : UsersService;
    let userRepository : MockRepository<Users>;

    beforeEach(async () => {
        const module : TestingModule = await Test.createTestingModule({
            providers : [
                UsersService,
                {
                    provide : getRepositoryToken(Users),
                    useValue : MockUserRepository()
                }
            ]
        }).compile()

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<MockRepository<Users>>(
            getRepositoryToken(Users),
        )
    })

    describe('service Defined', () => {
        it('should service Defined', () => {
            expect(service).toBeDefined()
        });
    });

    describe('save users', () => {
        it('should user save fail', async () => {
            const createUserDto : CreateUserDto = {
                email : "mock@idb.ai",
                password : "mock",
                name : "mock"
            }

            await service.save(createUserDto)

            const users = await userRepository.find();

            console.log(users)
        });
    })
})
