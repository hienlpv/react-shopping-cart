import React, { Component } from "react";
import { connect } from "react-redux";
import AdminControl from "../components/AdminControl";
import "../index.css";
import Table from "../components/Table";

class Admin extends Component {
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="sidebar">
              <AdminControl></AdminControl>
            </div>
            <div className="main">
              <Table></Table>
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default connect(() => ({}), {})(Admin);
