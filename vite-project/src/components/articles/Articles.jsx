import React from "react";
import { Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
const Articles = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
       .get('http://localhost:3000/articles', {headers: {
        'Authorization': localStorage.getItem("token") 
      }})
       .then((response) => {
          setArticles(response.data);
       })
       .catch((err) => {
          console.log(err);
       });
 }, []);

  return (
    <div>
      <div class="container bg1 row text-center">
        {articles.map((article) => (
          <>
            <div class="blog-card spring-fever">
              <div class="title-content">
                <h3>
                  <Link to={`/article/${article.id}`}>{article.title}</Link>
                </h3>
                {article.user && (
                  <div class="intro">
                    <Link to="/user">{article.user.username}</Link>
                  </div>
                )}
              </div>
              <div class="card-info">
                <p class="card-text">{article.description}</p>
                <Link to={`/article/${article.id}`} className="btn btn-light">
                  Read Article
                </Link>
              </div>
              <div class="utility-info">
                <ul class="utility-list">
                  <li>
                    <span class="licon icon-dat"></span>Created{" "}
                    {article.created_at} ago, edited {article.updated_at} ago
                  </li>

                  {article.categories.length>0 && (
                    <li>
                      
                      {article.categories.map((category) => (<>
                        <span class="licon icon-tag"></span>
                        <span class="mt-2">{category.name}</span>
                        </>
                      ))}
                    </li>
                  )}
                </ul>
              </div>
              <div class="gradient-overlay"></div>
              <div class="color-overlay"></div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Articles;
