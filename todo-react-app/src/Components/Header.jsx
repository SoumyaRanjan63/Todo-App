import { AppBar, Box, Button, IconButton,  Toolbar, Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useLocation, useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate=useNavigate()
    const location = useLocation();

    const handleLogin =()=>{
        navigate('/Login')
    }
    const handleSignup = () => {
        navigate('/Signup');
    };
    const handleDashboard = () => {
        
        navigate('/Dashboard');
    };

    const isLoginPage = location.pathname === '/Login';
    const isSignupPage = location.pathname === '/Signup';
    const isDashboardPage = location.pathname === '/Dashboard';

    return (
        <AppBar position='static' style={{height:"50px",justifyContent:'center' ,backgroundColor:'white'}} >
            <Toolbar>
                {/* <IconButton onClick={handleDashboard}>
                    <ListAltIcon  
                    size='large'
                    edge='start'
                    color='black'
                    style={{ width: "50px", height: "50px" }} 
                 />
                </IconButton> */}
                <img src="https://user-images.githubusercontent.com/55911470/214786962-51be4929-05a4-489a-add4-79033c7fe037.png" alt="todo logo" style={{width:"40px",height:"40px",borderRadius:"50%"}}  />
                <Typography variant='h6' component='div' sx={{flexGrow:1,display:{xs:'none',md:'flex'},color:'#560319',fontWeight: 'bold',fontFamily:'Apple Color Emoji'}}>TODO APP</Typography>
                <Box >
                    {isLoginPage && <Button variant="contained" color='secondary' onClick={handleSignup}>Sign Up</Button>}
                    {isSignupPage && <Button variant="contained" color='primary' onClick={handleLogin}>Login</Button>}
                     {isDashboardPage && (
                        <>
                            <Button variant="contained" color='secondary' style={{marginRight:"6px"}} onClick={handleSignup}>Sign Up</Button>
                            <Button variant="contained" color='primary' onClick={handleLogin}>Login</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}   

export default Header;
