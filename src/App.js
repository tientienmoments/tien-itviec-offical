import React, {useState} from 'react';
import './App.css';
import Homepage from './pages/Homepage'
import Login from './Login'
import Jobs from './pages/Jobs'
import Detail from './pages/Detail'
import {Switch, Route, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState({ isAuthenticated: true });

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const FourOhFourPage = () => {
    return (
      <div>
        <h1>404 Not Found</h1>
      </div>
    );
  };

  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={Jobs}/>
      <Route exact path ="/login" component={Login}/>
      <Route exact path ="/jobs" component={Jobs}/>
      <ProtectedRoute
      path ="/jobs/:id" 
      render ={(props)=> <Detail jobtitle="hahaha" props={props}/>}
      />
      <Route path="*" component={FourOhFourPage} />
      </Switch>
      
    </div>
  );
}

export default App;
