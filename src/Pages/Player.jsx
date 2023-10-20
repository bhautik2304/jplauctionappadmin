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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { dataCheng, onInputCheng, openModel, playerClear } from '../Stores/Slice/modelSlice';
import { apiRoutes, appAxios } from '../Constants';
import { Delete, Edit } from '@mui/icons-material';
import { fetcchplayer } from '../Stores/Slice/playerSlice'

const playerSkill = [
  "ALL ROUNDER",
  "BATSMAN",
  "BOWLER",
  "W.K. / BATSMAN",
]

function Player() {
  const { player } = useSelector(state => state.palyer)
  const dispatch = useDispatch()
  const deletes = (id) => {
    appAxios.delete(`${apiRoutes.playearcategury}${id}`).then((e) => {
      dispatch(fetcchplayer())
      // dispatch(fetchplayercategury())
    })
  }
  return (
    <>
      <Stack display={'flex'} direction={'row'} justifyContent={'flex-end'} my={'20px'} >
        <Button variant='contained' onClick={() => dispatch(openModel({ st: true, key: 'playerModel' }))} >
          Create New Player
        </Button>
      </Stack>
      <CateguryModel />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Mobile</StyledTableCell>
              <StyledTableCell align="center">Skill</StyledTableCell>
              <StyledTableCell align="center">Base Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {player.map((row, key) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {++key}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row?.name}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row?.mobaile}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {row?.skill}
                </StyledTableCell>
                <StyledTableCell align="center">{row?.playercategurie?.points}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton onClick={() => deletes(row.id)}>
                    <Delete color='error' />
                  </IconButton>
                  <IconButton onClick={() => {
                    dispatch(dispatch(dataCheng({ data: row, pk: 'player' })))
                    dispatch(dispatch(openModel({ st: 'u', key: 'playerMood' })))
                    dispatch(dispatch(openModel({ st: true, key: 'playerModel' })))
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

export default Player

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

  const [imageData, setImageData] = useState(null);
  const { playerModel, player, playerMood } = useSelector(state => state.modalData)
  const { playerCategury } = useSelector(state => state.palyercategury)
  const dispatch = useDispatch()
  console.log(playerCategury);
  const handleImageChange = (event) => {
    setImageData(event.target.files[0]);
  };

  const submit = () => {
    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('data', JSON.stringify(player));
    appAxios.post(apiRoutes.player, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((e) => {
      dispatch(playerClear())
      dispatch(fetcchplayer())
    })
  }
  const update = () => {
    appAxios.put(`${apiRoutes.player}${player.id}`, player).then((e) => {
      dispatch(playerClear())
      dispatch(fetcchplayer())
    })
  }
  return (
    <>
      <Modal
        open={playerModel}
        onClose={() => dispatch(openModel({ st: false, key: 'playerModel' }))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="my-2">
            <center><h5>Create New Player</h5></center>
          </div>
          <div className="container">
            <div className="my-3">
              <TextField value={player.player_no} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'player', ck: 'player_no' }))} placeholder='Player No' fullWidth size='small' />
            </div>
            <div className="my-3">
              <TextField value={player.name} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'player', ck: 'name' }))} placeholder='Name' fullWidth size='small' />
            </div>
            <div className="my-3">
              <TextField value={player.mobaile} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'player', ck: 'mobaile' }))} placeholder='Mobile' fullWidth size='small' />
            </div>
            {/* <div className="my-3">
              <TextField value={player.skill} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'player', ck: 'points' }))} placeholder='Base Point' fullWidth size='small' />
            </div> */}
            <div className="my-3">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={player.playercategurie_id}
                fullWidth
                size='small'
                label="Player Categury"
                onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'player', ck: 'playercategurie_id' }))}
              >
                <MenuItem value="Choose Categury"> Choose Categury </MenuItem>
                {playerCategury.map(data => <MenuItem key={data.id} value={data.id}>{data.name} {`(${data.points})`}</MenuItem>)}
              </Select>
            </div>

            <div className="my-3">
              <div className="my-3">
                <TextField value={player.skill} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'player', ck: 'skill' }))} placeholder='Skill' fullWidth size='small' />
              </div>
            </div>
            {playerMood == 'c' &&
              <div className="my-3">
                <TextField type='file' onChange={handleImageChange} fullWidth size='small' />
              </div>
            }
            {playerMood == 'c' ?
              <>
                <div className="my-3">
                  <Button fullWidth size='small' onClick={() => submit()} variant='contained' >Create Categury</Button>
                </div>
              </>
              :
              <>
                <div className="my-3">
                  <Button fullWidth size='small' variant='contained' onClick={() => update()} color='warning' >Update Categury</Button>
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