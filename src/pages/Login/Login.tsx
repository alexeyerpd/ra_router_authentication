import * as React from 'react';
import {NotAuthorized} from 'components/NotAuthorized/NotAuthorized';
import {Layout} from 'containers/Layout/Layout';
import {useNavigate} from 'react-router-dom';
import {cn} from 'utils/classname';
import {frontend} from 'utils/frontend';
import {useStorageState} from 'utils/localStorage';

import './Login.scss';

const block = cn('login');

export function Login() {
    const [token, setToken] = useStorageState('token', '');
    const navigate = useNavigate();

    const [login, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const auth = async (body: {login: string; password: string}) => {
        try {
            const responseData = await frontend.auth(body);
            setToken(responseData.token);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!login || !password) {
            return;
        }

        (async () => {
            const isSuccess = await auth({login, password});
            if (isSuccess) {
                setUsername('');
                setPassword('');
                navigate('/news');
            }
        })();
    };

    React.useEffect(() => {
        (async () => {
            if (token) {
                try {
                    await frontend.getUser(token);
                    navigate('/news');
                } catch (e) {
                    // @ts-ignore
                    console.log(e.message, ' e');
                }
            }
        })();
    }, []);

    return (
        <Layout
            header={
                <form className={block()} onSubmit={handleSubmit}>
                    <input
                        className={block('input')}
                        type="text"
                        value={login}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        className={block('input')}
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className={block('btn')} type="submit">
                        Login
                    </button>
                </form>
            }
        >
            <NotAuthorized />
        </Layout>
    );
}
