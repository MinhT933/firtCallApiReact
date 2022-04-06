
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInSide from "./pages/login/login";
import HomeTemplate from "./pages/HomeTemplate/HomeTemplate";
import { routesHome } from "./route";
import { BrowserRouter } from "react-router-dom";


function App() {
  const showMenuHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };
  return (
    // <Router >
    //   <Switch>

    //     <Topbar />
    //     <div className="container">
    //       <Sidebar />
    //       <Route exact path="/">
    //         <Home />
    //       </Route>

    //       <Route exact path="/users">
    //         <UserList />
    //       </Route>
    //       <Route path="/user/:userId">
    //         <User />
    //       </Route>
    //       <Route path="/newUser">
    //         <NewUser />
    //       </Route>
    //       <Route path="/newTour">
    //         <NewTour />
    //       </Route>
    //       <Route path="/Tour/:TourId">
    //         <Tour />
    //       </Route>
    //       <Route path="/Tour">
    //         <TourList />
    //       </Route>
    //       <Route path="/Booking">
    //         <ListBooking />
    //       </Route>
    //       <Route path="/TravelTour">
    //         <TraveList />
    //       </Route>
    //     </div>
    //   </Switch>

    // </Router>
    <BrowserRouter>
      <Switch>
        {showMenuHome(routesHome)}
        <Route exact path="/login">
          <SignInSide />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
