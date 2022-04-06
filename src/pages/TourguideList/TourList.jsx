import "./tourList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import NewTourguide from "../NewTourguid/newTourguide";
import EditTourguide from "../EditTourguide/EditTourguide";


export default function TourList() {
  // const [data, setData] = useState(TourRows);
  const dispatch = useDispatch();
  
  const [openPopup, setOpenPopup]= useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tourguide, setTourguide] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    axios.get("https://traveltogetherr.somee.com/api/v1.0/tourguide?page=4").then((res) => {
      console.log(res);
      setTourguide(res.data.data)
    }).catch(() => {
      console.log("Error")
    })
  }, [
  ])
  const handleDelete = (id) => {

    // dispatch(DeleteUser(id));
    axios.delete(`https://traveltogetherr.somee.com/api/v1.0/tourguide/${id}`)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => { alert("remove faild " + id); })
  };


  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "Name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="TourListItem">
            <img className="TourListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "Address", headerName: "Address", width: 150, renderCell: (params) => {
        return (
          <div className="TourListItem">
            {params.row.address}
          </div>
        );
      },
    },

    {
      field: "Phone Number",
      headerName: "Phone Number",
      width: 175,
      renderCell: (params) => {
        return (
          <div className="TourListItem">
            {params.row.phone}
          </div>
        );
      }
    },
    {
      field: "Email",
      headerName: "Email",
      width: 175,
      renderCell: (params) => {
        return (
          <div className="TourListItem">
            {params.row.email}
          </div>
        );
      }
    },
    {
      field: "Rank",
      headerName: "Rank",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="TourListItem">
            {params.row.rank}
          </div>
        );
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
          
           <button className="userAddButton" onClick={()=> {
            setOpenPopup(true);
            setUserId(params.row.id)
           } }>Edit</button>
           
            <DeleteOutline
              className="TourListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (

    <div className="TourList">
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create
      </Button>
      {tourguide && <DataGrid
        rows={tourguide}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />}
      <NewTourguide open={open} handleClose={handleClose} />
      <EditTourguide onpenPopup={openPopup} userId={userId}  />
    </div>
  );
}
