import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const NewArticle = () => {
    const optionList = [
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "blue", label: "Blue" },
        { value: "white", label: "White" }
    ];
    const [selectedOptions, setSelectedOptions] = useState();
    function handleSelect(data) {
        setSelectedOptions(data);
    }
    return (
        <div>
            <h1 className="text-center m-4">Create New Article</h1>
            <div className="container m-4">


                <div className="row justify-content-center">
                    <div className="col-10">
                        <form className='shadow p-3 mb-3 bg-info rounded cl1'>

                            <div className="form-group row">
                                <label className='col-2 col-form-label text-light' >title</label>
                                <div className="col-10">
                                    <input type="text" className='form-control shadow rounded' placeholder="Title Of Article" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className='col-2 col-form-label text-light' >description</label>
                                <div className="col-10">
                                <textarea  rows={10} className='form-control shadow rounded' placeholder="Description Of Article" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className='col-2 col-form-label text-light' >category</label>
                                <div className="col-10">
                                    <Select options={optionList} className="shadow rounded" placeholder="Make your selection from the list below (can be empty)" value={selectedOptions} onChange={handleSelect} isSearchable={true} isMulti></Select>
                                </div>
                            </div>

                            <div className="form-group-row row justify-content-center">
                                <input type="submit" className="btn btn-outline-light btn-lg" />
                            </div>
                        </form>
                    </div>
                    <div className="m-4 ">
                        <Link to="/articles" className="text-white">'[ Cancel and Return To Article List ]'</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArticle