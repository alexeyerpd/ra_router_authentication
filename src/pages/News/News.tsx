import * as React from 'react';
import {NewsItem} from 'components/NewsItem/NewsItem';
import {Profile} from 'components/Profile/Profile';
import {Layout} from 'containers/Layout/Layout';
import {Link} from 'react-router-dom';
import {useGetUserFromLoaderOrRedirect} from 'ui/hooks/useGetUserFromLoaderOrRedirect';
import {cn} from 'utils/classname';
import {Frontend, frontend} from 'utils/frontend';
import {useStorageState} from 'utils/localStorage';

import './News.scss';

const block = cn('news');

export function News() {
    useGetUserFromLoaderOrRedirect();

    const [token] = useStorageState('token', '');
    const [news, setNews] = React.useState<Frontend.NewsDto[]>([]);

    const getNews = async () => {
        try {
            const responseData = await frontend.getNews(token);
            setNews(responseData);
        } catch (e) {
            console.log(e);
        }
    };

    React.useEffect(() => {
        if (!token) {
            return;
        }
        getNews();
    }, [token]);

    return (
        <Layout header={<Profile />}>
            <div className={block()}>
                {news.map((item) => (
                    <Link key={item.id} to={`/news/${item.id}`} className={block('item')}>
                        <NewsItem data={item} />
                    </Link>
                ))}
            </div>
        </Layout>
    );
}
