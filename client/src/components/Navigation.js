import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div>
            <nav class="navigation">
                <ul>
                    <Link class="linkhome" to="/">Home</Link>
                    <Link class="linkadd" to="/add-exercise">Create Exercise</Link>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation