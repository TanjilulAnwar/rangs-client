import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import { IconButton } from '@material-ui/core';
import axios from '../../api';
import cogoToast from 'cogo-toast';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function ToDoTable({todo_list, refresh, handleUpdate}) {
  const classes = useStyles();

  const handleDelete = (id)=>{
    axios.delete(`/Duty/delete?id=${id}`)
      .then(resp => {
        if(resp.data.success){
          cogoToast.success('Todo Deleted')
          refresh()
        } else cogoToast.error(resp.data.message)
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Task Name</b></TableCell>
            <TableCell><b>Start Date</b></TableCell>
            <TableCell><b>End Date</b></TableCell>
            <TableCell><b>Assign To</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todo_list.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.task_name}</TableCell>
              <TableCell>{row.start_date?.split('T')[0]}</TableCell>
              <TableCell>{row.end_date?.split('T')[0]}</TableCell>
              <TableCell>{row.assign_to}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={()=>handleUpdate(row)}>
                  <CreateIcon color="primary" fontSize="small"/>
                </IconButton>
                <IconButton size="small" onClick={()=>handleDelete(row.id)}>
                  <DeleteForeverIcon color="error" fontSize="small"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
