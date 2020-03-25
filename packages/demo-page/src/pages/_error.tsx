import React, {Component} from 'react';
import Link from 'next/link';
import {wrapper} from '../components/store';
import {ReduxWrapperPageProps} from 'next-redux-wrapper';
import {State} from '../components/reducer';

class ErrorPage extends Component<ReduxWrapperPageProps<State>> {
    public static getInitialProps = wrapper.getInitialPageProps(({store, pathname}) => {
        console.log('2. Page.getInitialProps uses the store to dispatch things');
        store.dispatch({type: 'PAGE', payload: 'was set in error page ' + pathname});
    });

    render() {
        const {page} = this.props.store.getState();
        return (
            <>
                <p>
                    This is an error page, it also has access to store: <code>{page}</code>
                </p>
                <nav>
                    <Link href="/">
                        <a>Navigate to index</a>
                    </Link>
                </nav>
            </>
        );
    }
}

export default wrapper.withRedux(ErrorPage);
