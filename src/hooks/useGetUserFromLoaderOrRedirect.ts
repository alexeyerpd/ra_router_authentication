import * as React from 'react';
import {useLoaderData, useNavigate} from 'react-router-dom';
import {Frontend} from 'utils/frontend';

export function useGetUserFromLoaderOrRedirect() {
    const user = useLoaderData() as Frontend.UserDto | null;
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, []);

    return [user] as const;
}
