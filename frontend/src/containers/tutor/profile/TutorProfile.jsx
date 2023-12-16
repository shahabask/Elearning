import { useEffect, useState } from "react";
import "../../../Containers/tutor/profile/Profile.css";
import AddForm from "./AddForm";
import { axiosInstance as tutorAxiosInstance } from "../../utils/tutorAxios";
function TutorProfile() {
  const [tutorData, setTutorData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subcategories, setSubcategories] = useState("");
  useEffect(() => {
    fetchTutor();
  }, []);
  const fetchTutor = async () => {
    try {
      const response = await tutorAxiosInstance.get("/loadProfile");
      setTutorData([response.data.myProfile]);
      setSubcategories(response.data.subCategories);
    } catch (error) {
      console.log("error", error.response || error.error);
    }
  };
  const handleEditClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };
  return (
    <div style={{ minHeight: "90vh",backgroundColor:'rgba(224, 176, 255, 0.2)' }}>
      <div className="container ">
        <div className="row gutters row-with-padding">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar  with-border">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdE5vknOx-qLzTCFwcHv4c2gaQEgwV25KmSg&usqp=CAU"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 className="user-name" style={{ textTransform: 'uppercase' }}>{tutorData[0]?.userName}</h5>
                    <h6 className="user-email">{tutorData[0]?.email}</h6>
                  </div>
                  <div className="centered-container">
                    <div className="row-container">
                      <div className="colum" onClick={handleEditClick}>
                        <i
                          className="fas fa-edit "
                          style={{ color: "blue" }}
                        ></i>
                        <span className="icon" style={{ marginLeft: "10px" }}>
                          Edit
                        </span>
                      </div>
                      {/* <div className="colum">
                        <i
                          className="fas fa-certificate"
                          style={{ color: "gold" }}
                        ></i>
                        <span className="icon" style={{ marginLeft: "10px" }}>
                          Badge
                        </span>
                      </div>
                      <div className="colum">
                        <i className="fas fa-eye"></i>
                        <span className="icon" style={{ marginLeft: "10px" }}>
                          Views
                        </span>
                      </div>
                      <div className="colum">
                        <i className="fas fa-users"></i>
                        <span className="icon" style={{ paddingLeft: "10px" }}>
                          Followers
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showForm ? (
            <AddForm tutorData={tutorData} subCategories={subcategories} />
          ) : (
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="bg-white shadow-md p-4 rounded-lg">
                <h1 className="text-3xl font-bold mb-4" style={{ textTransform: 'uppercase' }}>
                  {tutorData[0]?.userName}
                </h1>
                <p className="text-gray-600 text-sm mb-2">
                  {tutorData[0]?.address?.city}, {tutorData[0]?.address?.state},{" "}
                  {tutorData[0]?.address?.country}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {tutorData[0]?.degree}
                </p>
                <div className="mb-4">
                  <p className="text-gray-700 font-semibold">
                    Skills:
                    {tutorData[0]?.specification?.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index !== tutorData[0]?.specification.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </p>
                  <ul className="list-disc list-inside">
                    {tutorData[0]?.skills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 font-semibold">About Me:</p>
                  <p className="text-gray-600">{tutorData[0]?.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
