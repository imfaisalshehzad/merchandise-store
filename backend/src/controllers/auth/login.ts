import {Request, Response} from "express";
import {compare} from "bcryptjs";
import {readUserData} from "./service/authService";
import {createRefreshToken, createToken} from "../../utils/token";
import {loginFormSchema} from "../../schema/authSchema";

const login = async (req: Request, res: Response) => {

    try {
        const validation = loginFormSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({error: validation.error});
        }

        const {email, password} = req.body;

        const users = await readUserData();
        const user = users.find((item) => item.email === email);
        if (!user) {
            return res.status(401).send({message: "Invalid credentials"});
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({message: "Invalid credentials"});
        }

        const token = createToken(user.id);
        const refreshToken = createRefreshToken(user.id);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        });

        res.cookie("token", token, {
            httpOnly: false,
        });

        res.status(200).send({message: "User logged in successfully"});
    } catch (error) {

        console.error("Error logging in: ", error)
        res.status(500).send({message: "Error logging in"});
    }

};

export default login;