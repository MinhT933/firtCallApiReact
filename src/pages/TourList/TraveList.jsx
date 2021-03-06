import "./tourList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import axios from "axios";
import NewTour from "../newTour/NewTour";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import EditTourguide from "../EditTourguide/EditTourguide";
import { callAPIGetListUser } from "../../Module/action";


export default function TraveList() {
  // const [data, setData] = useState(TourRows);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openPopup, setOpenPopup]= useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tourguide, setTourguide] = useState([]);
  useEffect(() => {
    axios.get("https://traveltogetherr.somee.com/api/v1.0/tours?page=1").then((res) => {
      console.log(res);
      setTourguide(res.data.data)
    }).catch(() => {
      console.log("Error")
    })
  }, [

  ])
  const handleDelete = (id) => {
    axios.delete(`https://traveltogetherr.somee.com/api/v1.0/tours/${id}`)
        .then((res) => {
          console.log(res);
          alert("remove success");
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
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "QuanlityTrip", headerName: "QuanlityTrip", width: 150, renderCell: (params) => {
        return (
          <div className="TourListItem">
            {params.row.quatityTrip}
          </div>
        );
      },
    },

    {
      field: "Price",
      headerName: "Price",
      width: 175,
      renderCell: (params) => {
        return (
          <div className="TourListItem">
            {params.row.price}
          </div>
        );
      }
    },
    {
      field: "tourGuideID",
      headerName: "tourGuideID",
      width: 175,
      renderCell: (params) => {
        return (
          <div className="TourListItem">
            {params.row.tourGuideId}
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
            
              <button className="TourListEdit">Edit</button>
              
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
      <NewTour open={open} handleClose={handleClose} />
      <EditTourguide onpenPopup={openPopup}/>
    </div>
  );
}
