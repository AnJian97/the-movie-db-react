import React from 'react';

const SearchArea = (props)=>{
    return(
        <div className="container">
            <div className="row">
                <section className="col s12 m4 l8">
                    <form action="" onSubmit={props.handleSubmit}>
                        <input placeholder="Search Movie Poster" type="text" onChange={props.handleChange}/>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default SearchArea;