import collab_dark from '../assets/images/collabsphere-logo-dark-1.svg'
import { useNavigate } from 'react-router-dom'
function Nav({user}) {
    let navigate=useNavigate();
    
    

    let googleAuth = (e) => {
        e.preventDefault();
        window.open('http://localhost:8000/auth/google',"_self");
        
    };
    
    
  return (
    
      <div className="header">
        <header className="header-content">
            <a href="#home" className="home">
                <img src={collab_dark} alt="CollabSphere Logo" className = "logo-icon" />
            </a>

            <nav className ="nav">
                <a href="#home" className="nav-link"> Home </a>
                <a href="#features" className="nav-link"> Features </a>
                <a href="#contacts" className="nav-link"> Contacts </a>
            </nav>
            {user?
            <button className='join-header' onClick={logout}>Logout </button>
            :<button type='button'  className = "join-header" onClick={googleAuth}>
                Join
            </button>}
            

        </header>
    </div>
    
  )
}
export function logout(e)  {
    e.preventDefault();
    window.open('http://localhost:8000/auth/logout','_self');
};

export default Nav
