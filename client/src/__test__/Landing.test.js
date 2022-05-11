import React from "react";
import ReactDom from 'react-dom'
// import { Navbar } from "reactstrap";
import Landing from '../components/common/Landing'

import { BrowserRouter } from 'react-router-dom';

it("render Landing page", () => {
    const div = document.createElement("div");

    ReactDom.render(
        <BrowserRouter>
          <Landing />
        </BrowserRouter>, 
      div);
    
      ReactDom.unmountComponentAtNode(div);
})