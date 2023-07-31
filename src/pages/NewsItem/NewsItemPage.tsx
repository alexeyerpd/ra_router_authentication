import {NewsItem} from 'components/NewsItem/NewsItem';
import {NotFound} from 'components/NotFound/NotFound';
import {Profile} from 'components/Profile/Profile';
import {Layout} from 'containers/Layout/Layout';
import {useParams} from 'react-router';
import {useGetUserFromLoaderOrRedirect} from 'ui/hooks/useGetUserFromLoaderOrRedirect';
import {useRequest} from 'ui/hooks/useRequest';
import {Frontend, frontend} from 'utils/frontend';
import {useStorageState} from 'utils/localStorage';

import './NewsItemPage.scss';

export function NewsItemPage() {
    useGetUserFromLoaderOrRedirect();
    const [token, _setToken] = useStorageState('token', '');
    const params = useParams<{id: string}>();
    let content;

    const {data, loading} = useRequest<Frontend.NewsDto>(frontend.getNewsItem, {id: params.id || '', token});

    if (loading) {
        content = <div>Loading...</div>;
    } else if (data) {
        content = <NewsItem data={data} />;
    } else {
        content = <NotFound />;
    }

    return <Layout header={<Profile />}>{content}</Layout>;
}
