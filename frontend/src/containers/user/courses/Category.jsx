import { useEffect } from "react";
import { Link } from "react-router-dom";


function Category({ categoryName, image,_id}) {
  const modifiedImagePath = image
      ? `https://www.skillsync.website/images/${image}`
      : '';
      useEffect(()=>{
      
      },[])
      
  return (
    <Link to={`/category/${_id}`}>
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 relative group hover:bg-sky-50 hover:shadow-sky-50 transition-shadow">
      <div className="card h-100 group-hover:border border-blue-200">
        <img className="card-img-top" src={modifiedImagePath} alt="..." style={{ height: '200px' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="badge text-black text-xl font-semibold" style={{ borderRadius: '1px', backgroundColor: 'white', fontSize: 14 }}>
            {categoryName}
          </div>
        </div>
      </div>
    </div>
  </Link>
  
  
  )
}

export default Category
