// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import screenshot from "../../lib/screenshot";
const fs = require("fs");

type Data = {
  image: string | Buffer | null;
  link?: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    url,
    height,
    quality,
    type,
    width,
  }: {
    width?: number;
    height?: number;
    quality?: number;
    type?: "png" | "jpeg" | undefined;
    url?: string;
  } = req.query;

  if (
    !url
      ?.toString()
      .match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)
  ) {
    return res.status(400).json({ message: "Invalid URL", image: null });
  }
  try {
    const img = await screenshot(url?.toString() || `${process.env.WEB_URL}`, {
      height,
      quality,
      type,
      width,
    });
    const image = img.toString("base64");
    const id = nanoid();
    fs.writeFileSync(`./public/images/${id}.${type || "png"}`, image, "base64");
    res.status(200).json({
      image: `/images/${id}.${type || "png"}`,
      link: `${req.headers["host"]}/images/${id}.${type || "png"}`,
      message: "Here is your shot",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message, image: null });
  }
}
