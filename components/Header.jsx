import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/router';



const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const router = useRouter();
  
  
  const searchInput = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  
  
  const handleSearch = (e) => {
    e.preventDefault();
    const sanitizedSearchTerm = searchTerm.replace(/,/g, ' ');
    setSearchTerm('');
    router.push({
      pathname: '/search-results',
      query: { query: encodeURIComponent(sanitizedSearchTerm), filter: filterValue },
    });
  };
  
  function handleFilter(e) {
    setFilterValue(e)
  };
  
  
  return (     
    <>
<header className="p-3 mb-3 border-bottom">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
        <div className='logoContainer'>
            <Link href="/">
                <i className="fa-solid fa-code fa-xl" style={{color: "#000000"}}></i>
            </Link>
        </div>
        <div className='searchAndProfileContainer'>

        <form className="searchBar" role="search" onSubmit={handleSearch}>
        <div className="dropdown text-end">
          <Link href="#" className="btn btn-outline-dark me-2 d-block link-body-emphasis text-decoration-none " data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-sliders" style={{color: "#000000"}}></i>
          </Link>

          <ul className="dropdown-menu text-small">
            <li onClick={() => handleFilter("Open")} className="dropdown-item d-flex align-items-center gap-2 py-2"><span className='d-inline-block bg-primary rounded-circle p-1'></span>Open</li>
            <li onClick={() => handleFilter("Close")} className="dropdown-item d-flex align-items-center gap-2 py-2"><span className='d-inline-block bg-danger rounded-circle p-1'></span>Close</li>
            <li onClick={() => handleFilter("In Progress")} className="dropdown-item d-flex align-items-center gap-2 py-2"><span className='d-inline-block bg-info rounded-circle p-1'></span>In-Progress</li>
          </ul>

        </div>
          <input onChange={searchInput} value={searchTerm} type="search" className="form-control" placeholder="Search..." aria-label="Search" />
          <button type="submit" className="btn btn-outline-dark me-2"><i className="fa-solid fa-magnifying-glass" style={{color: "#000000"}}></i></button>
        </form>

        <div className="dropdown text-end">
          <Link href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
            <Image src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
          </Link>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><Link className="dropdown-item" href="/StudentDashboard">Dashboard</Link></li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  </header>

  </>
      );
  }

export default Header;
