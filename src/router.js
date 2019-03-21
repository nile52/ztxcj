import React from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'

import Largesreen from './pages/foreground/largesreen';

export default class ERouter extends React.Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/" render={()=>
                            <Switch>
                                <Route path="/largesreen" component={Largesreen} />
                                <Redirect to="/largesreen" /> 
                            </Switch>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}