import React from 'react';
import {observer} from 'mobx-react';
import StatsGrid from './statsGrid';
import Paginator from './paginator';

@observer
class Main extends React.Component { 

    render() {        
        return <div className="container">                                
            <StatsGrid />                  
            <Paginator />                 
        </div>
    }
}

export default Main;