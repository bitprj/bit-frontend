import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
padding: 10px;
margin: -8px -8px 0 -8px;
box-shadow: 0 4px 30px 0 rgba(144, 144, 144, 0.2);
align-items: center;
flex-wrap: wrap;
display: flex;
justify-content: space-between;
flex: 1;
position: relative;
`

const MenuBar = (props) => {
    const windowTitles = ["Curriculum", "Activity", "Progress", "Profile"];

    const windowPortals = windowTitles.map((title, index) => {
        const windowSelected = (index === props.currentWindow) ? "windowSelected" : null;
        return (
            <h3 key={`window-${index}`} className={`window-title ${windowSelected}`}
                onClick={() => props.clicked(index)}>
                {title}

                < style jsx > {`
                    .windowSelected {
                        color: #0070f3;
                    }
                    .window-title {
                        transition: 0.20s ease;
                    }
                    .window-title:hover {
                        color: #0070f3;
                    }
                `}</style>
            </h3 >
        )
    })


    return (
        <Menu>
            {windowPortals}
        </Menu>
    )
}

export default MenuBar;