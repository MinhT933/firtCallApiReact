import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as React from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { callAPIGetListUser } from "../../Module/action";
import AddIcon from '@mui/icons-material/Add';
import DiaglogSuccessDelete from '../../compinents/Popup/DiaglogSuccessDelete'
import ModalUser from "../Modal/Modal";

import NewBooking from '../NewBooking/NewBooking'
import Button from '@material-ui/core/Button';
import NewUser from "../newUser/NewUser";
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';




export default function UserList() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openPopup, setOpenPopup] = React.useState(true);
  const dispatch = useDispatch();
  const customer = useSelector((state) => {
    return state.user.listUser;
  });
  console.log(customer);
  useEffect(() => {
    dispatch(callAPIGetListUser())
  }, [dispatch])





    // dispatch(DeleteUser(id));
    const handleDelete = (id) => {

      // dispatch(DeleteUser(id));
      axios.delete(`https://traveltogetherr.somee.com/api/v1.0/customers/${id}`)
        .then((res) => {
          
          // onclick = { handleOpenDia }
          alert("remove success");
          window.location.reload(false);
        })
        .catch((err) => { alert("remove faild " + id); })
    };
  

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Phone",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.phone}
          </div>
        );
      },
    },
    {
      field: "Address",
      headerName: "Address",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.address}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
         <div>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">View Detail</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
         </div>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Button
        variant="contained"
        color="primary"
        size="small"

        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create
      </Button>
      {customer && <DataGrid
        rows={customer}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        onCellDoubleClick={(params, event) => {
          if (!event.ctrlKey) {
            event.defaultMuiPrevented = true;
          }
        }}
        {...customer}
      />}
      <NewUser open={open} handleClose={handleClose} />
    </div>
  );
}
