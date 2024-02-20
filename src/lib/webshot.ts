// create a client library for webshot that consumes the API

import axios from "axios";

const api =
    process.env.NODE_ENV === "production"
        ? "https://webshots.vercel.app/"
        : "http://localhost:3000";

class Webshot {
    constructor(private url: string, private config: ScreenshotsRequestBody) {}

    async takeScreenshot() {
        try {
            const response = await axios.post(`${api}/api/webshot`, {
                ...this.config,
                url: this.url,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default Webshot;
