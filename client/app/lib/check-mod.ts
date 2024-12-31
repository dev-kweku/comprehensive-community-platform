// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {json} from "@remix-run/node"
import { checkAuth } from "./check-auth"
import {  prisma } from "./prisma.server"



async function checkMod(request:Request){
    const userId=await checkAuth(request);
    const user=await prisma.user.findFirst({
        where:{id:userId,role:"moderator"},
    })
    if(!user){
        throw Response.json({},{status:403});
    }
    return user
}

export {checkMod}