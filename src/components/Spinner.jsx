import {Box} from '@mui/material';
import { SpinnerRoundOutlined } from 'spinners-react';

const Spinner = () => {
  return (<Box sx={{textAlign: "center"}}>
  <SpinnerRoundOutlined style={{marginTop: "10rem"}} size={54} thickness={83} speed={100} color="rgba(217, 25, 33, 1)" />
  </Box>
  )
}

export default Spinner