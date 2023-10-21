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
import { dataCheng, onInputCheng, openModel, playerCateguryClear } from '../Stores/Slice/modelSlice';
import axios , { apiRoutes} from '../Constants';
import { Delete, Edit } from '@mui/icons-material';
import {fetchplayercategury} from '../Stores/Slice/playerCategurySlice'

function PlayerCategury() {
    // const [open, setopen] = useState(false)
    const { playerCategury } = useSelector(state => state.palyercategury)
    const deletes = (id) => {
        axios.delete(`${apiRoutes.playearcategury}${id}`, playerCategury).then((e) => {
            dispatch(playerCateguryClear())
            dispatch(fetchplayercategury())
        })
    }
    const dispatch = useDispatch()
    return (
        <>
            <Stack display={'flex'} direction={'row'} justifyContent={'flex-end'} my={'20px'} >
                <Button variant='contained' onClick={() => dispatch(openModel({st:true,key:'playerCateguryModel'}))} >
                    Create New Categry
                </Button>
            </Stack>
            <CateguryModel />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Points</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playerCategury.map((row,key) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {++key}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row?.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row?.points}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton onClick={()=>deletes(row.id)}>
                                        <Delete color='error' />
                                    </IconButton>
                                    <IconButton onClick={()=>{
                                        dispatch(dispatch(dataCheng({data:row,pk:'playerCategury'})))
                                        dispatch(dispatch(openModel({st:'u',key:'playerCateguryMood'})))
                                        dispatch(dispatch(openModel({st:true,key:'playerCateguryModel'})))
                                    }} >
                                        <Edit color='warning' />
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

export default PlayerCategury

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

    const { playerCateguryModel, playerCategury, playerCateguryMood } = useSelector(state => state.modalData)
    const dispatch = useDispatch()

    const submit = () => {
        axios.post(apiRoutes.playearcategury, playerCategury).then((e) => {
            dispatch(playerCateguryClear())
            dispatch(fetchplayercategury())
        })
    }
    const update = () => {
        axios.put(`${apiRoutes.playearcategury}${playerCategury.id}`, playerCategury).then((e) => {
            dispatch(playerCateguryClear())
            dispatch(fetchplayercategury())
        })
    }

    return (
        <>
            <Modal
                open={playerCateguryModel}
                onClose={() => dispatch(openModel({st:false,key:'playerCateguryModel'}))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="my-2">
                        <center><h5>Create New Categury</h5></center>
                    </div>
                    <div className="container">
                        <div className="my-3">
                            <TextField value={playerCategury.name} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'playerCategury', ck: 'name' }))} placeholder='Name' fullWidth size='small' />
                        </div>
                        <div className="my-3">
                            <TextField value={playerCategury.points} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'playerCategury', ck: 'points' }))} placeholder='Base Point' fullWidth size='small' />
                        </div>
                        {playerCateguryMood == 'c' ?
                            <>
                                <div className="my-3">
                                    <Button fullWidth size='small' onClick={() => submit()} variant='contained' >Create Categury</Button>
                                </div>
                            </>
                            :
                            <>
                                <div className="my-3">
                                    <Button fullWidth size='small' onClick={()=>update()} variant='contained' color='warning' >Update Categury</Button>
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
