import { Button, IconButton, Stack, TextField, Autocomplete, Select, Menu, MenuItem } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
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
import Echo from 'laravel-echo'

// import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { onInputCheng, openModel, auctionClear, dataCheng } from '../Stores/Slice/modelSlice';
import { apiRoutes, appAxios } from '../Constants';
import { Delete, Edit } from '@mui/icons-material';
import { fetchteams } from '../Stores/Slice/teamSlice'
import { fetchSoldplayer } from '../Stores/Slice/soldPlayerSlice';
import { fetcchplayer } from '../Stores/Slice/playerSlice';



function Auction() {
  const { soldplayer } = useSelector(state => state.soldPlayer)
  const dispatch = useDispatch()

  const delteEntry = (id) => {
    appAxios.delete(apiRoutes.soldplayer + id).then(() => {
      dispatch(auctionClear())
      dispatch(fetchteams())
      dispatch(fetcchplayer())
      dispatch(fetchSoldplayer())
    })
  }

  return (
    <>
      <Stack display={'flex'} width={'100%'} direction={'row'} justifyContent={'flex-end'} my={0} sx={{ zIndex: 1 }} alignItems={'center'} >
        <Button variant='contained' onClick={() => dispatch(openModel({ st: true, key: 'auctionModel' }))} >Sell Player</Button>
      </Stack>
      <div className="p-4 col-12">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="center">TEAM</StyledTableCell>
                <StyledTableCell align="center">NAME</StyledTableCell>
                <StyledTableCell align="center">MOBILE NO</StyledTableCell>
                <StyledTableCell align="center">SKILL</StyledTableCell>
                <StyledTableCell align="center">BASE POINT</StyledTableCell>
                <StyledTableCell align="center">PURCHASE POINT</StyledTableCell>
                <StyledTableCell align="center">ACTION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soldplayer.map((row, key) => {
                return (
                  <>
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {++key}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {row?.teams?.team_name}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {row?.players?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {row?.players?.mobaile}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {row?.players?.skill}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {row?.players?.playercategurie?.points}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {row?.sold}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton onClick={() => delteEntry(row.id)} >
                          <Edit color='warning' />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <AuctionModal />
    </>
  )
}

const datas = {
  teams_id: '',
  players_id: '',
  sold: ''
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

const AuctionModal = () => {
  const [value, setValue] = React.useState('');
  const [teamdata, setTeamData] = React.useState('');
  // const [playerdata, setPlayerData] = React.useState('');
  const [pc, setPc] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [towvalue, settowValue] = React.useState('');
  const [towinputValue, settowInputValue] = React.useState('');
  const { auction, auctionModel } = useSelector(state => state.modalData)
  const { team: { team }, palyer: { player } } = useSelector(state => state)
  const dispatch = useDispatch()

  const submit = () => {
    appAxios.post(apiRoutes.soldplayer, auction).then((e) => {
      dispatch(auctionClear())
      dispatch(fetchteams())
      dispatch(fetchSoldplayer())
    })
  }
  const update = () => {
    appAxios.put(apiRoutes.team, auction).then((e) => {
      dispatch(auctionClear())
      dispatch(fetchteams())
    })
  }

  const teamData = team.map(e => ({ label: `${e.team_name} ( ${e.owner_name} - ${e.totale_points} )`, id: e.id, data: e }) || [])
  const playerData = player.filter((e) => e.sold == false).map(e => ({ label: `${e.name}`, id: e.id, data: e })) || []
  console.log(playerData);
  return (
    <>
      <Modal
        open={auctionModel}
        onClose={() => dispatch(openModel({ st: false, key: 'auctionModel' }))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="my-2">
            <center><h5>Sell Player</h5></center>
          </div>
          <div className="container">
            <div className="my-3">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={teamData || []}
                onChange={(data, newValue) => {
                  // console.log(newValue.id);
                  dispatch(onInputCheng({ pk: 'auction', ck: 'teams_id', data: newValue?.id }))
                  setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                value={value}
                inputValue={inputValue}
                size='small'
                fullWidth
                renderInput={(params) => <TextField {...params} fullWidth label="Team " />}
              />
            </div>
            <div className="my-3">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(data, newValue) => {
                  console.log(newValue);
                  dispatch(onInputCheng({ pk: 'auction', ck: 'players_id', data: newValue?.id }))
                  settowValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  settowInputValue(newInputValue);
                }}
                value={towvalue}
                inputValue={towinputValue}
                options={playerData || []}
                size='small'
                fullWidth
                renderInput={(params) => <TextField {...params} fullWidth label="Player..." />}
              />
            </div>
            <div className="my-3">
              <TextField value={towvalue?.data?.playercategurie?.points} onChange={(e) => dispatch(onInputCheng({ data: e.target.value, pk: 'team', ck: 'totale_points' }))} placeholder='Points' fullWidth size='small' />
            </div>
            {towvalue &&
              <>
                <div className="my-3">
                  <TextField value={towvalue?.totale_points} onChange={(e) => dispatch(onInputCheng({ pk: 'auction', ck: 'sold', data: e.target.value }))} placeholder='Points' fullWidth size='small' />
                </div>
              </>}
            <div className="my-3">
              <Button fullWidth size='small' onClick={() => submit()} variant='contained' >Create Team</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default Auction
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
/**
 
 */