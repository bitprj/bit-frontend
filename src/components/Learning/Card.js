import React from 'react';

const Card = (props) => {
    return (
        <div className='card'>
            Hello World

            <style jsx>{`
            .card {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 1rem;
                border-radius: 7px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
                overflow: hidden;
                background-color: navy;
                color: white;
            }
            `}</style>
        </div>
    )
}

export default Card;