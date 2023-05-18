import React from "react";
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../AuthContext";
import { Link, useLocation ,useParams} from "react-router-dom";
const Article = (props) => {
  const { user } = useContext(AuthContext);
  // let {id}=useParams();
  let id=props.id;
  if(!id)id=useParams().id;
  const [article, setArticle] = useState();

  useEffect( () => {
    axios
       .get(`http://localhost:3000/articles/${id}`, {headers: {
        'Authorization': localStorage.getItem("token") 
      }})
       .then((response) => {
          setArticle(response.data);
       })
       .catch((err) => {
          console.log(err);
       });
 }, []);


  return (
    <div>
      <h2 className="text-center mt-4">{article?.title}</h2>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-8 mt-4">
            <div className="card text-center shadow mb-5 bg-white rounded">
              <div className="card-header font-italic">
                by {article?.user.username}
                <Link to="/user">{article?.user.username}</Link>
                {article?.categories.length > 0 && (
                  <li>
                    {article?.categories.map((category) => (
                      <>
                        <span className="licon icon-tag"></span>
                        <span className="mt-2">{category.name}</span>
                      </>
                    ))}
                  </li>
                )}
              </div>
              <div className="card-body">
                <div className="card-text text-left">{article?.description}</div>
                {article?.user.id == user?.id && (
                  <>
                    <Link to="/article/edit" className="btn btn-outline-info">
                      Edit
                    </Link>
                    <Link
                      to="/article/delete"
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </Link>
                  </>
                )}
              </div>
              <div className="card-footer text-muted">
                <small>
                  Created{article?.created_at}ago, edited {article?.updated_at}ago
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
