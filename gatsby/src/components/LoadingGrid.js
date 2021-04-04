import { ItemsGrid, ItemStyles } from "../styles/Grids";
import React from 'react';

export default function LoadingGrid({ count }) {
    return (
    <ItemsGrid>
    {Array.from({ length: count }, (_, i) => (
        <ItemStyles>
            <p>
                <span className="mark">Loading...</span>
            </p>
            <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            className="loading"
            alt="Loading"
            width="400"
            height="500"
            />
        </ItemStyles>
    ))}
    </ItemsGrid>
    );
}