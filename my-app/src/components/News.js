import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import PropTypes from "prop-types";
import axios from "axios";

const headerStyle = {
  fontFamily: "Rowdies",
  textAlign: "center",
  marginTop: "6rem",
  fontSize: "xxx-large",
};

const News = ({ country, category, headline }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line
  }, [country, category]);

  const fetchArticles = async () => {
    const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&topic=${category}&token=${apiKey}&page=${page}&lang=en`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setArticles(response.data.articles);
      setTotalResults(response.data.totalArticles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handlePrevious = async () => {
    setPage(page - 1);
    fetchArticles();
  };

  const handleNext = async () => {
    setPage(page + 1);
    fetchArticles();
  };

  return (
    <div>
      <h2 style={headerStyle} className="header text-center">
        {headline}
      </h2>
      <div className="container my-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="row">
              {articles.map((article) => (
                <div className="col-md-3" key={article.url}>
                  <NewsItems
                    title={article.title}
                    description={article.description.slice(0, 80)}
                    imageUrl={article.image}
                    newsUrl={article.url}
                    author={article.source?.name}
                    date={article.publishedAt}
                    source={article.source} // Pass the entire source object
                  />
                </div>
              ))}
            </div>
            <div className="footerButtons d-flex justify-content-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="btn btn-dark"
                disabled={page === 1}
              >
                &larr; Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-dark"
                disabled={articles.length === 0}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  category: "general",
  headline: "Top Headlines",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  headline: PropTypes.string,
};

export default News;
