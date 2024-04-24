import bcrypt from "bcryptjs";

class HashService {
	createHash(password: string) {
		return bcrypt.hashSync(password, 8);
	}

	confirmPassword(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}
}

export default new HashService();
