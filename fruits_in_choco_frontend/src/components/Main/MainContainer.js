import React from "react";
import Main from "./Main.js";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {loadCategoryCards, selectCategory} from "../../redux/main-reducer";

class MainContainer extends React.Component {

    componentDidMount() {
        this.props.loadCategoryCards();
    }


    render() {
        return (
            <Main {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    categoryCards: state.mainPage.categoryCards
    // isAuth: state.auth.isAuth,
    // login: state.auth.login
});

export default compose(
    connect(mapStateToProps, {loadCategoryCards, selectCategory}),
    withRouter
)(MainContainer)

