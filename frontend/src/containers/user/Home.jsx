// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Typography from '@mui/material/Typography';
// import ComputerIcon from '@mui/icons-material/Computer';
// import WorkIcon from '@mui/icons-material/Work';
// import SchoolIcon from '@mui/icons-material/School';
import exam from '../../assets/exam 1.svg' 
import onlineTest from '../../assets/online-test 1.svg' 
import certificaton from '../../assets/certification 1.svg' 
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Footer from './home/Footer';
import Banner from './home/Banner';
import './home/Home.css'
import { useState } from 'react';



const cards = [1, 2, 3];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Home() {
  const [hover1,setHover1]=useState(false)
  const [hover2,setHover2]=useState(false)
  const [hover3,setHover3]=useState(false)
return (
  <ThemeProvider theme={defaultTheme}>
  <CssBaseline />
  <div className="home-background bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" > {/* Apply the CSS class here */}
  <main>
    {/* Hero unit */}
    <Banner />

    <Box className='bg-slate-500'
  sx={{
   
    
    padding: 5,
    margin: 2,
    marginTop:17,
    border: '1px solid #ccc',
    borderRadius: '5px',
  }}
  
>
  
  <div
    style={{
      
      // flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    }}
    className='sm:flex'
  >
    <div className=' hover:cursor-pointer hover:text-gray-300'
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        
      }}
      onMouseEnter={() => setHover1(true)}
      onMouseLeave={() => setHover1(false)}
    >
      <div className={`${hover1?`bg-gray-300 rounded-full text-lg transition duration-300 ease-in-out`:''}`}
        style={{
          
          
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
        onMouseEnter={() => setHover1(true)}
      onMouseLeave={() => setHover1(false)}
      >
        <img 
          src={onlineTest}
          alt="Computer"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%'}}
        />
      </div>
      <Typography variant="h6">Learn the latest skill</Typography>
      <Typography variant="body2">Add more skill to your resume</Typography>
    </div>

    <div className=' hover:cursor-pointer hover:text-gray-300'
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHover2(true)}
      onMouseLeave={() => setHover2(false)}
    >
      <div className={`${hover2?`bg-gray-300 rounded-full text-lg transition duration-300 ease-in-out`:''}`}
        style={{
          
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
        onMouseEnter={() => setHover2(true)}
      onMouseLeave={() => setHover2(false)}
      >
        <img
          src={exam}
          alt="Career"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%' }}
        />
      </div>
      <Typography variant="h6">Get ready for the career</Typography>
      <Typography variant="body2">Be prepared for having a high package job</Typography>
    </div>

    <div className=' hover:cursor-pointer hover:text-gray-300'
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHover3(true)}
      onMouseLeave={() => setHover3(false)}
    >
      <div className={`${hover3?`bg-gray-300 rounded-full text-lg transition duration-300 ease-in-out`:''}`}
        style={{
         
          padding: 8,
          borderRadius: '10%',
          display: 'inline-block',
        }}
        onMouseEnter={() => setHover3(true)}
      onMouseLeave={() => setHover3(false)}
      >
        <img
          src={certificaton}
          alt="Certificate"
          style={{ width: 48, height: 48, marginRight: 8, borderRadius: '10%' }}
        />
      </div>
      <Typography variant="h6">Earn a certificate</Typography>
      <Typography variant="body2">Announce your achievement through your certificate</Typography>
    </div>
  </div>
</Box>

 
  </main>
  </div>

</ThemeProvider>


);
}

export default Home