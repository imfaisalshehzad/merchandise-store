import {Request, Response} from 'express';
import {UserSignUpTypes} from "../../types/user.types";
import {v4 as uuidv4} from 'uuid';
import {readUserData, writeUserData} from "./service/authService";
import {hash} from "bcryptjs";
import {signupFormSchema} from "../../schema/authSchema";

const signup = async (req: Request, res: Response) => {
    try {
        const validation = signupFormSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({error: validation.error});
        }

        const {email, password} = req.body;
        const userData: UserSignUpTypes = {email, password};

        const users = await readUserData();
        const index = users.findIndex((item) => item.email === email);
        if (index === -1) {
            const userId = uuidv4();
            users.push({
                id: userId,
                ...userData,
                password: await hash(password, 8),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            //
            await writeUserData(users);
            res.status(201).send({message: 'User created successfully'});
        } else {
            res.status(400).json({message: 'User already found'});
        }
    } catch (error) {
        res.status(500).send({message: 'Error creating user'});
    }
};

export default signup;