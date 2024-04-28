import { db } from "../models";

class RoleService {
    async checkRoleExist(role: string) {
        const existRole = await db.role.findOne({ role });
        return !!existRole;
    }

    async findRole(role: string) {
        const roleData = await db.role.findOne({ role });
        if (!roleData) {
            throw new Error(`Не удалось найти роль ${role}`);
        }
        return { roleData };
    }

    async create(role: string) {
        const roleData = new db.role({ role });
        await roleData.save();
        return { role: roleData };
    }
}

export default new RoleService();
