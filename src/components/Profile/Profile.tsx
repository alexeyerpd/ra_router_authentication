import {useNavigate} from 'react-router';
import {useGetUserFromLoaderOrRedirect} from 'ui/hooks/useGetUserFromLoaderOrRedirect';
import {cn} from 'utils/classname';
import {Frontend} from 'utils/frontend';
import {useStorageState} from 'utils/localStorage';

import './Profile.scss';

const block = cn('profile');

export function Profile() {
    const [user] = useGetUserFromLoaderOrRedirect();
    const [_token, setToken] = useStorageState('token', '');
    const [_profile, setProfile] = useStorageState<Frontend.UserDto | undefined>('profile', undefined);

    const navigage = useNavigate();

    const logOut = () => {
        setToken('');
        setProfile(undefined);
        navigage('/');
    };

    if (!user) {
        return null;
    }

    const {avatar, name} = user;
    return (
        <div className={block()}>
            <h2 className={block('username')}>Hello, {name}</h2>
            <img className={block('img')} src={avatar} alt="avatar" />
            <button className={block('btn')} onClick={logOut}>
                Logout
            </button>
        </div>
    );
}
