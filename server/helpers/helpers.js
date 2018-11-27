import bcrypt from 'bcrypt';

export default class Helpers {
    static passwordHasher(password) {
        return bcrypt.hashSync(password, 10);
    }

    static comparePassword(password, savedPassword) {
        return bcrypt.compareSync(password, savedPassword);
    }
}