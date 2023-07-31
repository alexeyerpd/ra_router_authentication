import {AppClient, client} from '../client';

import {Frontend} from './index';

export const frontend = {
    auth(body: object) {
        return client.post<{token: string}>('/auth', {body: JSON.stringify(body)});
    },
    getUser(token: string) {
        return client.get<Frontend.UserDto>('/private/me', {headers: AppClient.getAuthHeader(token)});
    },
    getNews(token: string) {
        return client.get<Frontend.NewsDto[]>('/private/news', {headers: AppClient.getAuthHeader(token)});
    },
    getNewsItem({id, token}: {id: string; token: string}) {
        return client.get<Frontend.NewsDto>(`/private/news/${id}`, {headers: AppClient.getAuthHeader(token)});
    },
} as const;
