import { FreshContext, Handler } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import jwt from "jsonwebtoken";

export const handler: Handler = async (req: Request, ctx: FreshContext) => {
  if (ctx.destination !== "route") {
    const resp = await ctx.next();
    return resp;
  }
  if (ctx.route === "/login") {
    const resp = await ctx.next();
    return resp;
  }
  const cookies = getCookies(req.headers);
  const Auth = cookies.Auth;
  if (!Auth) {
    return new Response("", {
      status: 307,
      headers: { location: "/login" },
    });
  }
  const paylod = jwt.verify(Auth, "deberiaSerVariableDeEntorno");

  if (!paylod) {
    return new Response("", {
      status: 307,
      headers: { location: "/login" },
    });
  }
};
