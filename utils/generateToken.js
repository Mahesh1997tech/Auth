import jwt from "jsonwebtoken";
async function generateToken(id){
    return await jwt.sign({id},"jwtSecret",{
        expiresIn:'1d'
    })
}

export default generateToken;