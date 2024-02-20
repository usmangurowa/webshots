// create a client library for webshot that consumes the API

import axios from "axios";

class Webshot {
    constructor(private url: string, private config: ScreenshotsRequestBody) {}

    async takeScreenshot() {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/webshot",
                {
                    ...this.config,
                    url: this.url,
                }
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default Webshot;
