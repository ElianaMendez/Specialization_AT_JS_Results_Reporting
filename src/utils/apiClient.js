const { request } = require('@playwright/test');

class ApiClient {
    constructor() {
        this.context = null;
        this.baseURL = null;
    }

    async init(baseURL) {
        if (!this.context) {
            this.baseURL = baseURL;

            this.context = await request.newContext({
                baseURL: this.baseURL,
                extraHTTPHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }

    async _handleResponse(res) {
        const status = res.status();
        let body;
        try {
            body = await res.json();
        } catch {
            body = null;
        }
        return { status, body };
    }

    async createBooking(payload, baseURL) {
        await this.init(baseURL);
        const res = await this.context.post('/booking', { data: payload });
        return this._handleResponse(res);
    }

    async getBooking(id, baseURL) {
        await this.init(baseURL);
        const res = await this.context.get(`/booking/${id}`);
        return this._handleResponse(res);
    }

/*     async updateBooking(id, payload, token, baseURL) {
        await this.init(baseURL);
        const res = await this.context.put(`/booking/${id}`, {
            data: payload,
            headers: { Cookie: `token=${token}` }
        });
        return this._handleResponse(res);
    }

    async deleteBooking(id, token, baseURL) {
        await this.init(baseURL);
        const res = await this.context.delete(`/booking/${id}`, {
            headers: { Cookie: `token=${token}` }
        });
        return this._handleResponse(res);
    }

    async createToken(username, password, baseURL) {
        await this.init(baseURL);
        const res = await this.context.post('/auth', {
            data: { username, password }
        });
        return this._handleResponse(res);
    } */

}

module.exports = new ApiClient();