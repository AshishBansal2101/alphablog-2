import React from 'react'
import { Link ,BrowserRouter} from "react-router-dom";
const Navigation = () => {
  const logged_in=true;
  const current_user={admin:true,
                      username: "Ashish"};
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
     <a className="navbar-brand"  id="logo" href="/">Alpha blog</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        {logged_in ? <>
        <li class="nav-item">
        
          <Link to='/users'  className="nav-link" >Bloggers</Link>
          
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
            Articles
          </a>
          
          <div class="dropdown-menu">
            <Link to='/newarticle'  className="dropdown-item" >Create New Article</Link>
            <Link to='/articles'  className="dropdown-item" >View Articles</Link>
            </div>
        </li>
  
  
         <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
          </a>
          {current_user.admin && 
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to='/newcategory'  className="dropdown-item" >Create New Category</Link>
            <Link to='/viewcategory'  className="dropdown-item" >View Categories</Link>
          </div>
          }
        </li>

          <li class="nav-item">
          <Link to='/logout'  className="nav-link" >Logout</Link>
          </li>
  
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
            {current_user.admin && <span>"(Admin)"</span>} {current_user.username}
          </a>
          <div class="dropdown-menu">
          <Link to='/viewprofile'  className="dropdown-item" >View Your Profile</Link>
          <Link to='/editprofile'  className="dropdown-item" >Edit Your Profile</Link>
          <Link to='/deleteprofile'  className="dropdown-item" >Delete Your Profile</Link>
          </div>
        </li>
        </>
        :<>
       
          <li class="nav-item">
          <Link to='/login'  className="nav-link" >Login</Link>
          {/* <%= link_to 'Login', login_path, class:"nav-link" %> */}
          </li>
          <li class="nav-item">
          <Link to='/signup'  className="nav-link" >Signup</Link>
          {/* <%= link_to 'Signup', signup_path, class:"nav-link" %> */}
          </li>
          </>
        }
      </ul>
    
    </div>
  </nav>
  </div>
  )
}

export default Navigation