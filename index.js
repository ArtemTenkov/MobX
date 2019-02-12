import React from "react";
import ReactDOM from "react-dom";
import Main from './src/components/main';
import { Provider } from "mobx-react";
import {StatsStore} from './src/stores/statsStore';
import {UIStore} from './src/stores/uiStore';

class HelloMessage extends React.Component {
    render() {
        return <div>       
            <Provider uiStore={new UIStore()} statsStore={new StatsStore()}>
                <Main />
            </Provider>               
           </div>
    }
}

let App = document.getElementById("app");

ReactDOM.render(<HelloMessage />, App);