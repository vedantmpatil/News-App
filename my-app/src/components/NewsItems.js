import React from "react";

const NewsItems = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
 
  const sourceName = source && source.name ? source.name : "Unknown Source";

  const cardStyle = {
    position: "relative",
    height: "33rem", 
    overflow: "hidden",
  };

  const imageStyle = {
    minHeight: "12rem",
    maxHeight: "12rem", 
    objectFit: "cover", 
  };

  const buttonStyle = {
    position: "absolute",
    bottom: "14px", 
    left: "10px", 
  };

  // Convert date to readable format
  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div>
      <div className="card my-3" style={cardStyle}>
        <img
          src={imageUrl}
          className="card-img-top"
          style={imageStyle}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <span
            style={{ fontStyle: "italic" }}
            className="position-absolute top-0 end-0 badge rounded-pill bg-danger"
          >
            {sourceName}
          </span>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              {formattedDate}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            className="btn btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
