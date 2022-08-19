import React, { Component } from 'react';
import {Link, useMatch} from "react-router-dom";

const CustomLink = ({children, to, ...props}) => {
    const match = useMatch(to);
    return (
        <Link to={to} style={{textDecoration: 'none', color: '#000000', borderBottom: match ? `2px solid #03fcec` : 'none', marginLeft: match ? '16px' : 0}}>
            {children}
        </Link>
    );
}

export default CustomLink;