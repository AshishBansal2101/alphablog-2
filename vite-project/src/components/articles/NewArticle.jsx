import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
const NewArticle = () => {
  const navigate = useNavigate();
  let category_options;
  // let optionList = [];
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    const categories = async () => {
      try {
        category_options = await axios.get("http://localhost:3000/categories");
        const op = new Set();
        category_options.data.data.forEach((e) => {
          const add = { value: e.name, label: e.name, id: e.id };
          op.add(add);
          // setoptionList.push(add);
        });

        setOptionList(Array.from(op));
        console.log("optionlist", optionList);
      } catch (error) {
        console.log("categories error", error);
      }
    };

    categories();
  }, []);

  const [selectedOptions, setSelectedOptions] = useState();
  function handleSelect(data) {
    setSelectedOptions(data);
    console.log("guguuu", selectedOptions);
  }

  const [state, setState] = useState({
    title: "",
    description: "",
    category_ids: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("we are here");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token,
        },
      };
      let cat_id = [];
      selectedOptions.forEach((e) => {
        cat_id.push(e.id);
        // setoptionList.push(add);
      });
      // console.log("cat_id", cat_id)
      setState((prevProps) => ({
        ...prevProps,
        category_ids: [...cat_id],
      }));
      // console.log("state",state);
      const response = await axios.post(
        "http://localhost:3000/articles",
        {
          title: state.title,
          description: state.description,
          category_ids: [...cat_id],
        },
        config
      );
      // console.log(response);
      if (response.data.status == "409") {
        alert("wrong credentials");
        navigate("/newarticle");
      } else {
        alert("successful");
        navigate("/articles");
      }
    } catch (error) {
      console.log("new article error", error);
    }
  };

  return (
    <div>
      <h1 className="text-center m-4">Create New Article</h1>
      <div className="container m-4">
        <div className="row justify-content-center">
          <div className="col-10">
            <form
              className="shadow p-3 mb-3 bg-info rounded cl1"
              onSubmit={handleSubmit}
            >
              <div className="form-group row">
                <label className="col-2 col-form-label text-light">title</label>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control shadow rounded"
                    placeholder="Title Of Article"
                    name="title"
                    value={state.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-2 col-form-label text-light">
                  description
                </label>
                <div className="col-10">
                  <textarea
                    rows={10}
                    className="form-control shadow rounded"
                    placeholder="Description Of Article"
                    name="description"
                    value={state.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-2 col-form-label text-light">
                  category
                </label>
                <div className="col-10">
                  <Select
                    options={optionList}
                    className="shadow rounded"
                    placeholder="Make your selection from the list below (can be empty)"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                  ></Select>
                </div>
              </div>

              <div className="form-group-row row justify-content-center">
                <input type="submit" className="btn btn-outline-light btn-lg" />
              </div>
            </form>
          </div>
          <div className="m-4 ">
            <Link to="/articles" className="text-white">
              '[ Cancel and Return To Article List ]'
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArticle;
