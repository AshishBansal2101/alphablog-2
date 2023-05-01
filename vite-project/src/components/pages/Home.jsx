import React from 'react'

const Home = (props) => {
  return (
    <div className="container" id="home-container">
    <div className="jumbotron text-center text-white">
        
        <h1 className="display-4">Alpha Blog</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-4" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        {/* <%= link_to 'Sign up!', signup_path ,class:"btn btn-success btn-lg" %> */}
    </div>
</div>

  )
}

export default Home