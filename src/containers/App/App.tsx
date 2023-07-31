import {RouterProvider} from 'react-router';
import {router} from 'ui/routes/routes';

import '../../styles/root.scss';

export function App() {
    return <RouterProvider router={router} />;
}
