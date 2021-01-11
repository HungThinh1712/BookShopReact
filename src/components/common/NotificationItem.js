
import React, { useState } from 'react';

const NotificationItem = (props) => {



    return (

        <div onClick={(e) => {
            e.stopPropagation();
            props.onClick();
        }} className="notifications-item"> <img src={props.imgSrc} alt="img" />
            <div className="text">
                <h4>{props.title}</h4>
                <p style={{ fontSize: "14px" }}>{props.content}</p>
                <div style={{ display: 'flex', flexDirection: "row" }}>
                    <p onClick={(e) => {
            e.stopPropagation();
            props.onDelete();
        }} style={{ color: 'blueviolet', textDecoration: 'underline' }}>Xóa</p>
                </div>
                <div style={{ display: 'flex', flexDirection: "row" }}>
                    {props.status===0 ? <p style={{color:'blue'}}>{props.timeAgo}</p>: <p>{props.timeAgo}</p>}
                    {props.status === 0 ? <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'blueviolet', marginLeft: '10px', marginTop: '4px' }}></div> : null}
                </div>

            </div>
        </div>
    );
};

export default NotificationItem;