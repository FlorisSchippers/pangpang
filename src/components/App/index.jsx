import React, {PropTypes} from 'react';
import Title from './styled/title.jsx';

function App({children}) {
    /*<img src='https://emojipedia-us.s3.amazonaws.com/thumbs/160/apple/96/table-tennis-paddle-and-ball_1f3d3.png' alt='🏓' height='50px'/>*/
    return (
        <div>
            <Title>
                Scores
            </Title>
            <div>
                {children}
            </div>
        </div>
    );
}

App.propTypes = {
    children: PropTypes.node.isRequired,
};

export default App;