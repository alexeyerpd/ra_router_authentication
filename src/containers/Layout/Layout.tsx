import {Header} from 'components/Header/Header';
import {cn} from 'utils/classname';
import {ChildrenProps} from 'utils/types';

import './Layout.scss';

const block = cn('layout');

interface LayoutProps extends ChildrenProps {
    header?: JSX.Element;
}

export function Layout({header, children}: LayoutProps) {
    return (
        <div className={block()}>
            {header ? <Header>{header}</Header> : null}
            <div className={block('content')}>{children}</div>
        </div>
    );
}
