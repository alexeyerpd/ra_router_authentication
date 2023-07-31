import {cn} from 'utils/classname';

import './NotFound.scss';

const block = cn('not-found');

export function NotFound() {
    return (
        <div className={block()}>
            404 <br />
            Not Found{' '}
        </div>
    );
}
