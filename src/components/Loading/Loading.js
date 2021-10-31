import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <Box component="div"
        sx={{
            position:'fixed',
            width:'100%',
            height:'100%',
            left:0,
            right:0,
            top:0,
            backgroundColor:'#F0ECE9',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:100
        }}
        >
            <CircularProgress color="inherit" />
        </Box>
    );
};

export default Loading;