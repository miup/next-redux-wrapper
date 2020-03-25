import React, {FC} from 'react';
import Link from 'next/link';
import {Provider, useSelector} from 'react-redux';
import {ReduxWrapperPageProps} from 'next-redux-wrapper';

import {wrapper} from '../components/store';
import {State} from '../components/reducer';

export interface ConnectedPageProps {
    custom: string;
}

// here you can have all the page layout, this component can be connected to Redux Store
const ConnectedPage: FC<ConnectedPageProps> = ({custom}) => {
    const {page} = useSelector<State, State>(state => state);
    return (
        <div className="index">
            <pre>{JSON.stringify({page, custom}, null, 2)}</pre>
            <Link href="/other">
                <a>Navigate</a>
            </Link>
            {' | '}
            <Link href="/error">
                <a>Navigate to error</a>
            </Link>
        </div>
    );
};

export interface PageProps extends ReduxWrapperPageProps, ConnectedPageProps {}

// Page itself is not connected to Redux Store, it has to render Provider to allow child components to connect to Redux Store
const Page: FC<PageProps> = ({store, ...props}) => (
    <Provider store={store}>
        <ConnectedPage {...props} />
    </Provider>
);

export const getServerSideProps = wrapper.getServerSideProps(({store, req}) => {
    console.log('2. Page.getServerSideProps uses the store to dispatch things');
    store.dispatch({type: 'PAGE', payload: 'was set in index page ' + req.url});
    return {props: {custom: 'custom'}};
});

export default wrapper.withRedux(Page);
