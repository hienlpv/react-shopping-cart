import React, { Component } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { fetchMark, fetchType } from "../actions/tableActions";
import { filterProducts } from "../actions/productActions";

class MenuBar extends Component {
  state = {
    open: [],
  };

  type = [];

  componentDidMount() {
    this.props.fetchMark();
    this.props.fetchType();
    if (this.props.type) {
      let open = [...this.state.open];
      this.props.type.forEach((i) => {
        open.push(false);
      });
      this.setState({ open: open });
    }
  }
  render() {
    return (
      <div className="menu-bar">
        {this.props.type && this.props.mark && (
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                color="primary"
                style={{
                  background: "rgba(1, 127, 255,0.2)",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  zIndex: "0",
                }}
              >
                Danh mục sản phẩm
              </ListSubheader>
            }
          >
            {this.props.type.map((item, index) => (
              <div>
                <ListItem
                  button
                  divider
                  onClick={() => {
                    let open = [...this.state.open];
                    open[index] = !open[index];
                    this.setState({ open: open });
                    open[index]
                      ? this.type.push(item.title)
                      : (this.type = this.type.filter((i) => i !== item.title));
                    this.props.filterProducts(this.props.products, {
                      type: this.type,
                      mark: null,
                    });
                  }}
                  style={{ background: "rgba(1, 127, 255,0.2)" }}
                >
                  <ListItemText primary={item.title} />
                  {this.state.open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={this.state.open[index]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    disablePadding
                    style={{ paddingLeft: "6px" }}
                  >
                    {this.props.mark
                      .filter((mark) => mark.type === item.title)
                      .map((item, index) => (
                        <ListItem
                          button
                          onClick={() => {
                            this.props.filterProducts(this.props.products, {
                              type: [item.type],
                              mark: item.title,
                            });
                          }}
                        >
                          <ListItemText primary={item.title} />
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({
    mark: state.table.mark,
    type: state.table.type,
    products: state.products.items,
  }),

  { fetchMark, fetchType, filterProducts }
)(MenuBar);
