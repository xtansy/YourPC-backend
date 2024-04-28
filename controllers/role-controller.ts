import { Request, Response } from "express";
import { db } from "../models";
import { RoleService } from "../services";

const role = db.role;

export const get = async (req: Request, res: Response) => {
    try {
        const roles = await role.find({}).exec();
        res.json({
            message: "success",
            data: roles,
        });
    } catch (error) {
        res.json({
            errorMessage: "Ошибка при получении всех пользователей",
            error,
        });
    }
};

export const deleteAll = async (req: Request, res: Response) => {
    try {
        await role.deleteMany({});
        res.json({
            message: "sucess",
            data: "All role has been deleted",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Cannot delete all role",
            error,
        });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const role = req.body.role;
        const isExist = await RoleService.checkRoleExist(role);
        if (isExist) {
            return res.status(403).json({
                errorMessage: "Такая роль уже существует",
            });
        }
        const roleDto = await RoleService.create(role);

        res.json({
            message: "sucess",
            data: roleDto,
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось создать роль",
            error,
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const roleId = req.body.roleId;
        await role.findByIdAndDelete(roleId);

        res.json({
            message: "Роль успешно удалена",
        });
    } catch (error) {
        res.status(403).json({
            errorMessage: "Не удалось удалить роль",
            error,
        });
    }
};
