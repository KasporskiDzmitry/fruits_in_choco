import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.authReducer.isAuth,
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (localStorage.isAuth || this.props.isAuth)
                return <Component {...this.props} />;
            return <Navigate to={'/'} />;
        }
    }

    const ConnectedAuthRedirectedComponent = connect(
        mapStateToPropsForRedirect
    )(RedirectComponent);

    return ConnectedAuthRedirectedComponent;
};
