import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import axios from "axios";
import { withSessionRoute } from "@/lib/withSession";

type Data = {
  message?: string;
  invitationUrl?: string;
};

// pages/api/login.ts

export default withSessionRoute(loginRoute);

async function loginRoute(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not supported" });
  }

  const { username, password } = req.body;
  console.log("username, password: ", username, password);

  const cookies = new Cookies(req, res);

  req.headers.cookie = "";
  req.url = process.env.URL_SERVER_API + req.url;
  console.log("req.url: ", req.url);

  req.session.user = {
    id: 230,
    admin: true,
    username,
    password,
  };

  await req.session.save();
  res.send("Logged in");

  // try {
  //   const response = await axios.post(req.url, {
  //     username,
  //     password,
  //   });
  //   const { accessToken, message } = response.data;
  //   cookies.set("accessToken", accessToken, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: "lax",
  //     maxAge: 60000 * 60 * 24 * 365,
  //   });
  //   res.status(200).json({ message });
  // } catch (err) {
  //   console.log("err: ", err.response?.status);
  //   switch (err.response?.status) {
  //     case 404:
  //       cookies.set("accessToken", "", {
  //         httpOnly: true,
  //         secure: false,
  //         sameSite: "lax",
  //         maxAge: 1,
  //       });
  //   }
  //   res.status(err?.response?.status).json(err.response.data);
  //   // get user from database then:

  // }
}
