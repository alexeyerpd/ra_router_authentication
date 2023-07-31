import * as React from 'react';
import {frontend} from 'utils/frontend';

type Request = (typeof frontend)[keyof typeof frontend];

export function useRequest<T>(request: Request, ...args: Parameters<Request>) {
    const [data, setData] = React.useState<T>();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const getData = async () => {
        try {
            setLoading(true);
            // @ts-ignore
            const response = await request(...args);
            setData(response as T);
        } catch (e) {
            if (typeof e === 'object' && e && 'message' in e) {
                setError(e.message as string);
            }
        } finally {
            setLoading(false);
        }
    };

    const update = () => {
        if (error) {
            setError('');
        }
        getData();
    };

    React.useEffect(() => {
        update();
    }, []);

    return {data, loading, error, update} as const;
}
