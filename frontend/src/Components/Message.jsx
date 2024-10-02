import React from 'react'
import Alert from '@mui/material/Alert';

const Message = ({message,state}) => {
    return (
        <div className='absolute bottom-3 right-3'>
            <Alert variant="filled" severity={state}>
                {message}
            </Alert>
        </div>
    )
}

export default Message
