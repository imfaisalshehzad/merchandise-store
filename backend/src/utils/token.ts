import {NextFunction, Request, Response} from "express";
import {JwtPayload, sign, verify} from "jsonwebtoken";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    const refreshToken = req.cookies?.refreshToken;

    if (!token && !refreshToken) {
        return res.status(401).send({message: "Unauthorized"});
    }

    let authReq;
    try {
        authReq = verify(token, `${process.env.JWT_TOKEN_KEY}` || '');
    } catch (error) {
        console.error("Error verifying token: ", error);
    }

    if (!authReq) {
        try {
            const refreshTokenReq = verify(refreshToken, `${process.env.JWT_REFRESH_TOKEN}` || '');
            const newToken = createToken((refreshTokenReq as JwtPayload).id);
            res.cookie("token", newToken, {
                httpOnly: false,
            });
        } catch (error) {
            console.error("Error verifying refresh token: ", error);
            return res.status(401).send({message: "Unauthorized"});
        }
    }
    next();
}

export const createToken = (userId: string) => {
    return sign({userId}, `${process.env.JWT_TOKEN_KEY}` || '', {
        // token valid for 3 days
        expiresIn: 3 * 24 * 60 * 60,
    });
};

export const createRefreshToken = (userId: string) => {
    return sign({userId}, `${process.env.JWT_REFRESH_TOKEN}` || '', {
        // token valid for 7 days
        expiresIn: 7 * 24 * 60 * 60,
    });
}