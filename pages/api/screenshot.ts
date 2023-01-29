// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import FormData from "form-data";
import { createReadStream, unlinkSync, writeFileSync } from "fs";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import validUrl from "valid-url";
import screenshot from "../../lib/screenshot";

type Data = {
  image: string | Buffer | null;
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

  if (!url) {
    return res.status(400).json({ message: "URL is required", image: null });
  }

  if (!validUrl.isUri(url)) {
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
    writeFileSync(`./public/images/${id}.${type || "png"}`, image, "base64");

    const formData = new FormData();
    formData.append(
      "file",
      createReadStream(`./public/images/${id}.${type || "png"}`)
    );
    formData.append("upload_preset", "screenshots");

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dgqfojhx4/image/upload",
      formData
    );

    // delete the image from the server
    unlinkSync(`./public/images/${id}.${type || "png"}`);

    res.status(200).json({
      image: `${data.url}`,
      message: "Here is your shot",
    });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data, image: null });
    }
    res.status(500).json({ message: error.message, image: null });
  }
}
