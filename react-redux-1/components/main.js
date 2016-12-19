import React from 'react';
import { Link } from 'react-router';
import NavigationContainer from "../containers/user/NavigationContainer"


class main extends React.Component {
    componentDidMount(){
        //this.props.userActions.;
        console.log(this.props);
        this.props.userActions.checkLogin();
    }
    
    render() {
        console.log(this.props);
        return (
            <div>
                <h1 className="main-title-text">
                    Definitely Not Craigslist
                </h1>
                <NavigationContainer />
                
                
                {React.cloneElement(this.props.children,this.props)}

                
                <hr/>
                <h5>					
                    <iframe src="https://ghbtns.com/github-btn.html?user=fuqi1001&repo=Not-Craigslist&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe><br/>
                    <a href="https://github.com/fuqi1001/Not-Craigslist">View on GitHub</a>
                </h5>
            </div>
        );
    }
};

export default main;