import React from 'react';
import {Provider} from 'react-redux';
import App, {AppInitialProps} from 'next/app';
import {ReduxWrapperAppProps} from 'next-redux-wrapper';
import {wrapper} from '../components/store';
import {State} from '../components/reducer';

class WrappedApp extends App<ReduxWrapperAppProps<State>> {
    public static getInitialProps = wrapper.getInitialAppProps<Promise<AppInitialProps>>(async ({Component, ctx}) => {
        // Keep in mind that this will be called twice on server, one for page and second for error page
        ctx.store.dispatch({type: 'APP', payload: 'was set in _app'});

        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                // Some custom thing for all pages
                pathname: ctx.pathname,
            },
        };
    });

    public render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

export default wrapper.withRedux(WrappedApp);
