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
    },
    company: {
        async resolve({ error, request: { headers }}) {
            const session = await auth.api.getSession({
                headers,
            })

            if (!session) return error(401)

            const role = session.user.role
            const hasCompanyRole = role?.split(",").includes("company")

            if (!hasCompanyRole) return error(403)

            return {
                user: session.user,
                session: session.session
            }  
        }
    },
    hasCompany: {
        async resolve({ error, request: { headers }}) {
            const session = await auth.api.getSession({
                headers,
            })

            if (!session) return error(401)

            const company = session.user.companyId

            if (!company) return error(403)

            return {
                user: session.user,
                session: session.session
            }  
        }
    }
})