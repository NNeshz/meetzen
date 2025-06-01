import { Elysia } from "elysia";
import { auth } from "@meetzen/auth/index";

export const betterAuthPlugin = new Elysia({ name: "better-auth-plugin"})
.mount(auth.handler)
.macro({
    authenticated: {
        async resolve( { error, request: { headers }}) {
            const session = await auth.api.getSession({
                headers,
            })

            if (!session) return error(401)

            return {
                user: session.user,
                session: session.session
            }  
        }
    }
})