import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>SpaceX-Dgraph</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <br></br>
          <Link to="/cart" >Cart</Link>
          <br></br>
          <Link to="/bookedTrips">BookedTrips</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar; 