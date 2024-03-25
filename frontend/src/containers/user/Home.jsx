

import CssBaseline from '@mui/material/CssBaseline';


// import Footer from './home/Footer';
import { BiBookOpen,BiRadioCircle, BiBell } from 'react-icons/bi';
import Banner from './home/Banner';
import './home/Home.css'

import { useNavigate } from 'react-router-dom';



// const cards = [1, 2, 3];

// TODO remove, this demo shouldn't need to reset the theme.


function Home() {
  
  const navigate=useNavigate()

return (
  <>
 
  <CssBaseline />
  <div className="home-background bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" > {/* Apply the CSS class here */}
  <main>
    {/* Hero unit */}
    <Banner />



 
  </main>
  </div>
  <section className=" border-bottom container  bg-slate-200  lg:pl-20" id="features">
      <div className="container px-5 my-5 ">
        <div className="row gx-5 shadow-lg rounded-lg border-1 border-gray-400">
          <div className="col-lg-4 mb-3 mb-lg-0 border-r-2" 
          style={{
            transition: "background-position 0.3s",
            padding: "10px",
            display: "inline-block",
            backgroundImage:
              "linear-gradient(to left, 	rgb(196 181 253) 50%, white 50%)",
            backgroundSize: "200% 100%",
          }}
          onClick={() => navigate('/profile')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundPosition = '-100% 0';
            e.currentTarget.style.color = 'white'; 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundPosition = '0% 0';
            e.currentTarget.style.color = 'black'; 
          }}>
            <div className="feature bg-violet-950 bg-gradient text-white rounded-3 mb-3">
              <BiBookOpen />
            </div>
            <h2 className="h4 fw-bolder p-2">Ready to attend quiz ?</h2>
            <p className='p-2'>
            Explore a world of knowledge with our quiz section! Select from a variety of categories to challenge yourself and test your understanding.After completing a quiz, track your progress and view your results in your profile. Expand your horizons and have fun while learning!
            </p>
            
          </div>
          <div
            className="col-lg-4 mb-3 mb-lg-0 border-r-2"
            style={{
              transition: "background-position 0.3s",
              padding: "10px",
              display: "inline-block",
              backgroundImage:
                "linear-gradient(to left, 	rgb(196 181 253) 50%, white 50%)",
              backgroundSize: "200% 100%",
            }}
            onClick={() => navigate('/lives')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = '-100% 0';
              e.currentTarget.style.color = 'white'; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = '0% 0';
              e.currentTarget.style.color = 'black'; 
            }}
          >
            <div className="feature bg-violet-950 bg-gradient text-white rounded-3 mb-3">
              <BiRadioCircle />
            </div>
            <h2 className="h4 fw-bolder p-2">Want to join lives ?</h2>
            <p className='p-2'>
            
Welcome to our live section, where learning comes to life! Join expert tutors in real-time sessions covering a range of topics. Explore upcoming live events, interact with instructors, and engage with fellow learners. Stay connected, stay informed, and embark on your educational journey with us!
            </p>
            
          </div>
          <div className="col-lg-4" 
          style={{
            transition: "background-position 0.3s",
            padding: "10px",
            display: "inline-block",
            backgroundImage:
              "linear-gradient(to left, rgb(196 181 253) 50%, white 50%)",
            backgroundSize: "200% 100%",
          }}
          onClick={() => navigate('/plans')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundPosition = '-100% 0';
            e.currentTarget.style.color = 'white'; 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundPosition = '0% 0';
            e.currentTarget.style.color = 'black'; 
          }}>
            <div className="feature bg-violet-950 bg-gradient text-white rounded-3 mb-3">
              <BiBell />
            </div>
            <h2 className="h4 fw-bolder p-2">Want to be premium Member ?</h2>
            <p className='p-2'>
            
            Discover limitless learning with our subscriptions! Access premium courses and live sessions taught by experts. Choose your plan and dive into knowledge today!            </p>
           
          </div>
        </div>
      </div>
    </section>
</>


);
}

export default Home