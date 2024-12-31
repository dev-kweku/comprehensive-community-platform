// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { json } from "@remix-run/node";
import { authCookie } from "./cookies-server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function logout(request:Request){
    return Response.json(null,{
status:200,
headers:{
    "Set-Cookie":await authCookie.serialize("auth",{
        maxAge:0,
    })
}
    })
}

export {logout}