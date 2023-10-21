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
import { dataCheng, onInputCheng, openModel, teamClear } from '../Stores/Slice/modelSlice';
import axios , { apiRoutes} from '../Constants';
import { Delete, Edit } from '@mui/icons-material';
import { fetchteams } from '../Stores/Slice/teamSlice'

function Team() {
    const { team } = useSelector(state => state.team)
    const deletes = (id) => {
        axios.delete(`${apiRoutes.team}${id}`).then((e) => {
          dispatch(fetchteams())
          // dispatch(fetchplayercategury())
        })
      }
    const dispatch = useDispatch()
    return (
        <>
            <Stack display={'flex'} direction={'row'} justifyContent={'flex-end'} my={'20px'} >
                <Button variant='contained' onClick={() => dispatch(openModel({ st: true, key: 'teamModel' }))} >
                    Create New Team
                </Button>
            </Stack>
            <TeamModel />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="center">Owner Name</StyledTableCell>
                            <StyledTableCell align="center">Team Name</StyledTableCell>
                            <StyledTableCell align="center">Point</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {team.map((row, key) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {++key}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row?.owner_name}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row?.team_name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row?.totale_points}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => deletes(row.id)}>
                                        <Delete color='error' />
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        dispatch(dispatch(dataCheng({ data: row, pk: 'team' })))
                                        dispatch(dispatch(openModel({ st: 'u', key: 'teamMood' })))
                                        dispatch(dispatch(openModel({ st: true, key: 'teamModel' })))
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

export default Team

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

function TeamModel() {

    const { teamModel, team, teamMood } = useSelector(state => state.modalData)
    const dispatch = useDispatch()

    const submit = () => {
        axios.post(apiRoutes.team, team).then((e) => {
            dispatch(teamClear())
            dispatch(fetchteams())
        })
    }
    const update = () => {
        axios.put(apiRoutes.team+team.id, team).then((e) => {
            dispatch(teamClear())
            dispatch(fetchteams())
        })
    }


    return (
        <>
            <Modal
                open={teamModel}
                onClose={() => dispatch(openModel({ st: false, key: 'teamModel' }))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="my-2">
                        <center><h5>Create New Team</h5></center>
                    </div>
                    <div className="container">
                        <div className="my-3">
                            <TextField value={team.owner_name} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'team', ck: 'owner_name' }))} placeholder='Owner Name' fullWidth size='small' />
                        </div>
                        <div className="my-3">
                            <TextField value={team.team_name} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'team', ck: 'team_name' }))} placeholder='Team Name' fullWidth size='small' />
                        </div>
                        <div className="my-3">
                            <TextField value={team.totale_points} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'team', ck: 'totale_points' }))} placeholder='Points' fullWidth size='small' />
                        </div>
                        {teamMood == 'c' ?
                            <>
                                <div className="my-3">
                                    <Button fullWidth size='small' onClick={() => submit()} variant='contained' >Create Team</Button>
                                </div>
                            </>
                            :
                            <>
                                <div className="my-3">
                                    <Button fullWidth size='small' variant='contained' onClick={()=>update()} color='warning' >Update Team</Button>
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
