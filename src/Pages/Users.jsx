import { Button, IconButton, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { onInputCheng, openModel, userClear } from '../Stores/Slice/modelSlice';
import { apiRoutes, appAxios } from '../Constants';
import { Delete, Edit } from '@mui/icons-material';
import { fetchUsers } from '../Stores/Slice/userSlice'

function Users() {
    const { user } = useSelector(state => state.users)
    const deletes = (id) => {
        appAxios.delete(`${apiRoutes.user}${id}`).then((e) => {
            dispatch(fetchUsers())
            // dispatch(fetchplayercategury())
        })
    }
    const dispatch = useDispatch()
    return (
        <>
            <Stack display={'flex'} direction={'row'} justifyContent={'flex-end'} my={'20px'} >
                <Button variant='contained' onClick={() => dispatch(openModel({ st: true, key: 'userModel' }))} >
                    Create New User
                </Button>
            </Stack>
            <CateguryModel />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Mobile</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.map((row, key) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {++key}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row?.name}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row?.email}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row?.mobaile}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => deletes(row.id)}>
                                        <Delete color='error' />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function CateguryModel() {

    const { user, userModel, userMood } = useSelector(state => state.modalData)
    const dispatch = useDispatch()

    const submit = () => {
        appAxios.post(apiRoutes.user, user).then((e) => {
            dispatch(userClear())
            dispatch(fetchUsers())
        })
    }
    const update = () => {
        appAxios.put(apiRoutes.user, user).then((e) => {
            dispatch(userClear())
            dispatch(fetchUsers())
        })
    }




    return (
        <>
            <Modal
                open={userModel}
                onClose={() => dispatch(openModel({ st: false, key: 'userModel' }))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="my-2">
                        <center><h5>Create New User</h5></center>
                    </div>
                    <div className="container">
                        <div className="my-3">
                            <TextField value={user.name} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'user', ck: 'name' }))} placeholder='Name' fullWidth size='small' />
                        </div>
                        <div className="my-3">
                            <TextField value={user.email} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'user', ck: 'email' }))} placeholder='email' fullWidth size='small' />
                        </div>
                        <div className="my-3">
                            <TextField value={user.mobaile} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'user', ck: 'mobaile' }))} placeholder='mobaile' fullWidth size='small' />
                        </div>
                        <div className="my-3">
                            <TextField value={user.password} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'user', ck: 'password' }))} placeholder='password' fullWidth size='small' />
                        </div>
                        {userMood == 'c' ?
                            <>
                                <div className="my-3">
                                    <Button fullWidth size='small' onClick={() => submit()} variant='contained' >Create Categury</Button>
                                </div>
                            </>
                            :
                            <>
                                <div className="my-3">
                                    <Button fullWidth size='small' variant='contained' color='warning' >Update Categury</Button>
                                </div>
                            </>
                        }
                    </div>
                </Box>
            </Modal>
        </>
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default Users