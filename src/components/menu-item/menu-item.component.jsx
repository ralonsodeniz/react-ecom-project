import React from "react";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size }) => {
  return (
    <div
      className={`${size} menu-item`} // in case the item has the size large property in the state at directory we apply an additional classname so the appropiated style is applied
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})` // we use inline css-js to apply the background image to our menu item by using the url passed as props
        }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
