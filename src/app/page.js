"use client"
import Image from "next/image";
import styles from "./page.module.css";
import TextField from '@mui/material/TextField';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Backdrop from '@mui/material/Backdrop';
import { deepOrange, deepPurple } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';

export default function Home() {
    
  const [data,setData] = useState([])
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [date,setDate] = useState('')
  const [email,setEmail] = useState('')
  const [nameEdit,setNameEdit] = useState('')
  const [phoneEdit,setPhoneEdit] = useState('')
  const [dateEdit,setDateEdit] = useState('')
  const [emailEdit,setEmailEdit] = useState('')
  const [loading,setLoading] = useState(false)
  const [openEdit,setOpenEdit] = useState(false)

  const id = useRef()

  const handleCloseEdit = () =>{

  }
  const handleOpenEdit = (data) =>{
    console.log(data)
    setOpenEdit(true)
    axios.get(`http://localhost:8000/users/${data}`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      setNameEdit(response.data.name)
      setPhoneEdit(response.data.phone)
      setEmailEdit(response.data.email)
      setDateEdit(response.data.date)
      id.current = data
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);

    })
    
  }

  const update = () =>{
        axios.patch(`http://localhost:8000/users/${id.current}`, {
          name: nameEdit,
            phone: phoneEdit,
            email:emailEdit,
            date:dateEdit,
            title: "Content",
            department:"new tag"
    })
      .then(response => {
        console.log(response.data)
        callOnUpdate()
      })
      .catch(error => console.error(error));

      setOpenEdit(false)
     

    console.log(id.current)
  }

  const handleSave = () =>{
    setOpen(true)
      axios.post('http://localhost:8000/users', {
        name: name,
        phone: phone,
        email:email,
        date:date,
        title: "Content",
        department:"new tag"
      })
      .then(function (response) {
        console.log(response);
        setOpen(false)
        callOnUpdate()
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false)
      });
  }

  const callOnUpdate = () =>{
    axios.get('http://localhost:8000/users')
    .then(function (response) {
      // handle success
      console.log(response.data);
      setData(response.data.reverse())
    })
    .catch(function (error) {
      // handle error
      console.log(error);

    })
  }

  useEffect(()=>{
    axios.get('http://localhost:8000/users')
    .then(function (response) {
      // handle success
      console.log(response.data);
      setData(response.data.reverse())
    })
    .catch(function (error) {
      // handle error
      console.log(error);

    })
  },[])


  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#FF0000',
      borderColor: '#FF0000',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#FF0000',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  });

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <main className={styles.main}>
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
      <div className={styles.form}>
        <div className={styles.createAccount}>
          CREATE ACCOUNT
        </div>

        <div>ACC_1001</div>

        <div className={styles.formArea}>
       
            <div className={styles.eachField}>
              <div className={styles.textandIcon}>
                <TextFieldsIcon style={{marginRight:"5px"}}/>
                <span>Name</span>
              </div>
              <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className={styles.eachField}>
              <div className={styles.textandIcon}>
                <NumbersIcon style={{marginRight:"5px"}}/>
                <span>phone</span>
              </div>
              <TextField id="outlined-basic" label="phone number" variant="outlined" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div className={styles.eachField}>
              <div className={styles.textandIcon}>
                <ContactsIcon style={{marginRight:"5px"}}/>
                <span>Date</span>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs} value={date} onChange={(e)=>setDate(e.target.value)}>
                <DatePicker />
              </LocalizationProvider>
            </div>
            <div className={styles.eachField}>
              <div className={styles.textandIcon}>
                <EmailIcon style={{marginRight:"5px"}}/>
                <span>Email</span>
              </div>
              <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>


            <div className={styles.rightButton}>
              <BootstrapButton style={{marginRight:".5em"}} variant="contained">Cancel</BootstrapButton >
              <Button variant="contained" onClick={handleSave}>Save</Button>
            </div>
      
        </div>
      </div>
      <div className={styles.table}>

        <div className={styles.header}>
          <div className={styles.leftHeader}>
            <div className={styles.contacts}>
              <HomeIcon style={{marginRIght:'5px'}}/>
              <span>Contacts</span>
            </div>
               <div className={styles.divider}></div>
            <div className={styles.contacts}>
              
              <span>Location</span>
            </div>
          </div>

          <AddIcon />
        </div>

        <TableContainer component={Paper} className={styles.tableContent}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           <TableCell>Check</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Department</TableCell>
            <TableCell align="left">Icon</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
              <Checkbox {...label} />
              </TableCell>
              <TableCell align="left">
                <div styles={{display:'flex',justifyContent:"flex-start",alignItems:"center"}}>
               {row.name}
                </div>
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left"><Chip style={{color:"blue"}} label={row.department} /></TableCell>
              <TableCell align="left"><EditIcon style={{cursor:'pointer'}} onClick={(e)=>handleOpenEdit(row.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openEdit}
          onClick={handleCloseEdit}
        >
          <Paper style={{width:'30vw',padding:'1em'}}>
          <div className={styles.formArea}>
       
            <div className={styles.eachField}>
              <div className={styles.textandIcon}>
                <TextFieldsIcon style={{marginRight:"5px"}}/>
                <span>Name</span>
              </div>
              <TextField id="outlined-basic" label="Name" variant="outlined" value={nameEdit} onChange={(e)=>setNameEdit(e.target.value)}/>
            </div>
            <div className={styles.eachField}>
              <div className={styles.textandIcon}>
                <NumbersIcon style={{marginRight:"5px"}}/>
                <span>phone</span>
              </div>
              <TextField id="outlined-basic" label="phone number" variant="outlined" value={phoneEdit} onChange={(e)=>setPhoneEdit(e.target.value)}/>
            </div>
            <div className={styles.eachField}>
              <div className={styles.textandIcon}>
                <ContactsIcon style={{marginRight:"5px"}}/>
                <span>Date</span>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs} value={dateEdit} onChange={(e)=>setDateEdit(e.target.value)}>
                <DatePicker />
              </LocalizationProvider>
            </div>
            <div className={styles.eachField}>
              <div className={styles.textandIcon}>
                <EmailIcon style={{marginRight:"5px"}}/>
                <span>Email</span>
              </div>
              <TextField id="outlined-basic" label="Email" variant="outlined" value={emailEdit} onChange={(e)=>setEmailEdit(e.target.value)}/>
            </div>


            <div className={styles.rightButton}>
              <BootstrapButton style={{marginRight:".5em"}} variant="contained" onClick={()=>setOpenEdit(false)}>Cancel</BootstrapButton >
              <Button variant="contained" onClick={update}>Save</Button>
            </div>
      
        </div>
          </Paper>
        </Backdrop>
    </main>
  );
}
