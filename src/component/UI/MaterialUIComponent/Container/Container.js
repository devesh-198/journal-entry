import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const SimpleContainer = (props) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container >
                {props.children}
            </Container>
        </React.Fragment>
    );
}

export default SimpleContainer;