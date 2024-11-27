import { Request, Response } from "express";
import { UserModel } from "../models/UsersModel";
import jwt from "jsonwebtoken"

export const registerUsers = async (req:Request, res:Response):Promise<any> =>{
    try {
        //Primero validar que los datos que necesitamos existen
        const name = req.body.name
        const email = req.body.email
        const lastNames = req.body.lastName
        const password = req.body.password
        const rol = req.body.rol

        //Administradores no pueden crear clientes
        if(req.user?.rol === "administrator" && rol === "client"){
            return res.status(400).json({msg:"Los administradores no pueden crear clientes"})
        }

        if(!name || !email || !lastNames || !password || !rol){
            return res.status(400).json({
                msg:"Faltan datos para crear un usuario"
            })
        }
        //Validar que el usuario sea administrador si el usuario a crear es administrador
        if(rol === "administrator" && req.user?.rol != "administrator"){
            return res.status(400).json({
                msg:"No puedes crear un nuevo administrador si no eres uno"
            })
        } 

        const user = await UserModel.create({
            name,
            lastNames,
            email,
            password,
            rol       
        })

        const token = jwt.sign(JSON.stringify(user), "shhh");

        return res.status(200).json({msg:"Usuarios registrados con exito", token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Hubo un error al crear los usuarios"})
    }
}

export const singIn = async (req: Request, res: Response): Promise<any> => {
    try {
        //Correo y contraseña
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "El campo de correo y contraseña son requeridos" });
        }

        // Verificar que el usuario existe con el email y la passwor
        const user = await UserModel.findOne({email:req.body.email, password:req.body.password});

        // Si no existe devuelve un error
        if (!user) {
            return res.status(404).json({ msg: "El usuario no existe" });
        }
        
        // Devolver un token
        const token = jwt.sign(JSON.stringify(user), "shhh");

        return res.status(200).json({ msg: "El usuario si existe", token, user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hubo un error al intentar iniciar sesion" });
    }
};
