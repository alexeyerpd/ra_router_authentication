// eslint-disable-next-line sort-imports
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import {Login} from 'ui/pages/Login/Login';
import {News} from 'ui/pages/News/News';
import {NewsItemPage} from 'ui/pages/NewsItem/NewsItemPage';
import {frontend} from 'utils/frontend';
import {getStorageValue} from 'utils/localStorage';

async function checkIsAuth() {
    const token = getStorageValue('token', '');
    try {
        return await frontend.getUser(token);
    } catch (e) {
        return null;
    }
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Login />} />
            <Route path="news">
                <Route index loader={checkIsAuth} element={<News />} />
                <Route path=":id" element={<NewsItemPage />} loader={checkIsAuth} />
            </Route>
        </Route>,
    ),
);
