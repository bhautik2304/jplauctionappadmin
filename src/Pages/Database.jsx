import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Player, PlayerCategury, Team, Users } from './'
import axios from 'axios';
function Database() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios("http://43.206.149.16/api/team").then(e => console.log(e.data))
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="basic tabs example">
                    <Tab label="Player Categury" {...a11yProps(0)} />
                    <Tab label="Player Database" {...a11yProps(1)} />
                    <Tab label="Team Owner" {...a11yProps(2)} />
                    <Tab label="Admin Users" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <PlayerCategury />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Player />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Team />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Users />
            </CustomTabPanel>
        </Box>
    );
}

export default Database


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}