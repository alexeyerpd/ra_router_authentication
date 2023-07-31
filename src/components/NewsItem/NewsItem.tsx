import {cn} from 'utils/classname';
import {Frontend} from 'utils/frontend';

import './NewsItem.scss';

const block = cn('news-item');

interface NewsItemProps {
    data: Frontend.NewsDto;
}

export function NewsItem({data: {content, image, title}}: NewsItemProps) {
    return (
        <div className={block()}>
            <img className={block('image')} src={image} alt="image" />
            <div className={block('block')}>
                <h2 className={block('title')}>{title}</h2>
                <p className={block('content')}>{content}</p>
            </div>
        </div>
    );
}
