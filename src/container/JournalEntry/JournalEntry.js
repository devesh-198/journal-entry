import React from 'react';
import { NavLink } from 'react-router-dom';

const JournalEntry = () => {
    return (
        <div>
            <p>this is working.</p>
            <NavLink to="/logout">Logout</NavLink>
        </div>
    )
}

export default JournalEntry;