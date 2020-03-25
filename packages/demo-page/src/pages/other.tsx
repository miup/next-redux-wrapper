import React, {FC} from 'react';
import Link from 'next/link';
import {Provider, useSelector} from 'react-redux';
import {ReduxWrapperPageProps} from 'next-redux-wrapper';
import {State} from '../components/reducer';
import {wrapper} from '../components/store';

// here you can have all the page layout, this component can be connected to Redux Store
const ConnectedOtherPage: FC<any> = () => {
    const {page} = useSelector<State, State>(state => state);
    return (
        <div className="other">
            <p>Using Next.js default prop in a wrapped component.</p>
            <pre>{JSON.stringify({page}, null, 2)}</pre>
            <nav>
                <Link href="/">
                    <a>Navigate to index</a>
                </Link>
            </nav>
        </div>
    );
};

export const getStaticProps = wrapper.getStaticProps(({store, previewData}) => {
    console.log('2. Page.getStaticProps uses the store to dispatch things');
    store.dispatch({type: 'PAGE', payload: 'was set in other page ' + JSON.stringify({previewData})});
});

// Page itself is not connected to Redux Store, it has to render Provider to allow child components to connect to Redux Store
const OtherPage: FC<ReduxWrapperPageProps<State>> = ({store}) => (
    <Provider store={store}>
        <ConnectedOtherPage />
    </Provider>
);

export default wrapper.withRedux(OtherPage);
