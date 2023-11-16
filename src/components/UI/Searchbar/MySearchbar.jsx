import React from 'react';
import classes from "./MySearchbar.module.css"
const MySearchbar = () => {
    return (
        <div className={classes.searchBar}>
            <input
                type="text"
                placeholder="Search"
                className={classes.searchInput}
            />
            <button className={classes.searchButton}>
                <i className="fas fa-search"></i> {/* Используйте иконку поиска по вашему выбору */}
            </button>
        </div>
    );
};

export default MySearchbar;