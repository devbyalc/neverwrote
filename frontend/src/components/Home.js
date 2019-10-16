/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

const React = require('react');

const NotebookList = require('./NotebookList');

/*
  *** TODO: Start building the frontend from here ***
  You should remove the placeholder text and modify the component as you see
  fit while working on the assignment.
*/
const Home = () => (
  <div>
  <div className="jumbotron text-center">
    <h1 id="page-header">Neverwrote</h1>
    <p id='welcome'>
     "Never say 'I never wrote that down' ever again!"
    </p>
    </div>
    <div className="container">
          <NotebookList />
    </div>

    </div>
);

module.exports = Home;
