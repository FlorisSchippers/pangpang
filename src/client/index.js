import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import * as firebase from 'firebase';
import Root from './Root';

const root = document.querySelector('#root');

const config = {
    apiKey: "AIzaSyCel1dDaGgzEC3KzQMaKVf08D1Xk5PcefI",
    authDomain: "pangpang-1.firebaseapp.com",
    databaseURL: "https://pangpang-1.firebaseio.com",
    projectId: "pangpang-1",
    storageBucket: "pangpang-1.appspot.com",
    messagingSenderId: "496542655678"
};
firebase.initializeApp(config);

const mount = RootComponent => {
    render(
        <AppContainer>
            <RootComponent/>
        </AppContainer>,
        root
    );
};

if (module.hot) {
    module.hot.accept('./Root', () => {
        // eslint-disable-next-line global-require,import/newline-after-import
        const RootComponent = require('./Root').default;
        mount(RootComponent);
    });
}

mount(Root);