export class AppClient {
    static backend = 'http://localhost:7070';

    static getAuthHeader = (token?: string) => {
        return token ? {Authorization: `Bearer ${token}`} : undefined;
    };

    constructor() {}

    toJson(response: Response) {
        if (response.status === 204) {
            return response;
        }
        return response.json();
    }

    checkStatus(response: Response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        throw new Error(response.statusText);
    }

    request(url: string, options: RequestInit = {}) {
        return fetch(`${AppClient.backend}${url}`, options).then(this.checkStatus).then(this.toJson);
    }

    get<ResponseType>(url: string, options: RequestInit = {}): Promise<ResponseType> {
        return this.request(url, options);
    }

    post<ResponseType>(url: string, options: RequestInit = {}): Promise<ResponseType> {
        return this.request(url, {
            method: 'POST',
            ...options,
            headers: Object.assign({'Content-Type': 'application/json'}, options?.headers || {}),
        });
    }

    delete(url: string) {
        return this.request(url, {
            method: 'DELETE',
        });
    }
}

export const client = new AppClient();
