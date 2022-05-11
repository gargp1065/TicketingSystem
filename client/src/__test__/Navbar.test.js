import React from "react";
import ReactDom from 'react-dom'
// import { Navbar } from "reactstrap";
import Navbar from '../components/common/Navbar'

import { BrowserRouter } from 'react-router-dom';

it("render Landing page", () => {
    const div = document.createElement("div");

    ReactDom.render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>, 
      div);
    
      ReactDom.unmountComponentAtNode(div);
})