import { FreshContext, Handlers } from "$fresh/server.ts";
import Login from "../components/Login.tsx";
import jwt from "jsonwebtoken";

import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {
    const form = await req.formData();
    const usr = form.get("usr");
    const pwd = form.get("pwd");

    if (usr !== "a" || pwd !== "a") {
      return ctx.render();
    }
    const token = jwt.sign(
      {
        username: "nombreUsuario",
      },
      "deberiaSerVariableDeEntorno",
      {
        expireIn: "24h",
      },
    );

    const headers = new Headers();
    const url = new URL(req.url);

    setCookie(headers, {
      name: "nombreAut",
      value: token,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/", //Esta cookie puede ser leida desde cualquier ruta
      secure: true,
    });
    headers.set("location", "/");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export const Page = () => <Login />;

export default Page;
