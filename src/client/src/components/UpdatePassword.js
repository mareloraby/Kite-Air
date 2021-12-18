import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/index.js";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { toast } from "react-toastify";
//mport Typography from '@mui/material/Typography';
export default function UpdatePassword({ handleDisplay }) {
  const [state, setState] = useContext(UserContext);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PassportNo, setPassportNo] = useState("");

  const [Current, setCurent] = useState("");
  const [New, setNew] = useState("");
  const [Retype, setRetype] = useState("");

  const [Address, setAddress] = useState(state.user.Address);
  const [username, setUsername] = useState(state.user.username);
  const [Password, setPassword] = useState(state.user.Password);
  const [CountryCode, setCountryCode] = useState(state.user.CountryCode);
  const [TelephoneNo, setTelephoneNo] = useState(state.user.TelephoneNo);
  const [Email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  const [loading, setLoading] = useState(false);

  // const [redirect, setRedirect] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (state && state.user) {
      console.log("user from state => ", state.user);
      setEmail(state.user.Email);
     // setPassportNo(state.user.PassportNo);
      setFirstName(state.user.FirstName);
      setLastName(state.user.LastName);
    }
  }, [state && state.user]);

  function updatePersonalInfo() {
    setLoading(true);
    const data = {
      _id: state.user._id,
      username: username,
      FirstName: FirstName,
      LastName: LastName,
      Address: Address,
      PassportNo: PassportNo,
      Password: Password,
      CountryCode: CountryCode,
      TelephoneNo: TelephoneNo,
      Email: Email,
      Admin: "0",
    };

    axios
      .put("http://localhost:8000/users/" + state.user._id, data)
      .then((res) => {
        //  console.log(data);

        // console.log("success");
        // alert("Success");

        let auth = JSON.parse(window.localStorage.getItem("auth"));
        auth.user = data;
        window.localStorage.setItem("auth", JSON.stringify(auth));
        // console.log("setting auth");
        // console.log(auth);

        // update context
        setState({ ...state, user: data });

        setLoading(false);

        toast.success("Profile Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setOk(true);
        handleDisplay();
      })
      .catch((err) => {
        setLoading(false);

        // console.log(err.response.data.split("-"));
        let arr = err.response.data.split("-");
        for (let e = 0; e < arr.length; e++) {
          if (arr[e].includes(","))
            toast.error(arr[e].split(",")[0], {
              position: "top-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          if (e === arr.length - 1) {
            toast.error(arr[e], {
              position: "top-right",
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      });
  }
 function updatePassword() {
    setLoading(true);
    const data = {
      _id: state.user._id,
      username: username,
      FirstName: FirstName,
      LastName: LastName,
      Address: Address,
      PassportNo: PassportNo,
      Password: Password,
      CountryCode: CountryCode,
      TelephoneNo: TelephoneNo,
      Email: Email,
      Admin: "0",
    };

    axios
      .post("http://localhost:8000/users/checkPassword/:id" + state.user._id, data)
      .then((res) => {
// console.log(user._id);
        //  console.log(data);

        // console.log("success");
        // alert("Success");

        let auth = JSON.parse(window.localStorage.getItem("auth"));
        auth.user = data;
        window.localStorage.setItem("auth", JSON.stringify(auth));
        // console.log("setting auth");
        // console.log(auth);

        // update context
        setState({ ...state, user: data });

        setLoading(false);

        toast.success("Password Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setOk(true);
        handleDisplay();
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Incorrect Current Password", {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        // console.log(err.response.data.split("-"));

      });
  }

  return (
    <Card style={{ }}>
      <CardContent style={{ backgroundColor: "	whitesmoke",padding:25}}>
        <Typography gutterBottom variant="h5" component="div">
          Basic Information
        </Typography>
        <hr />
        {open ? { handleDisplay } : " "}
      

       
        <div class="group">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label>Current  </label>
        <input   type="text"  value={PassportNo} onChange={(e) => {
              setPassportNo(e.target.value);
            }}/>
   
    </div>
    <br/>
    <div class="group">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>New      </label>
        <input   type="text"  value={PassportNo} onChange={(e) => {
              setPassportNo(e.target.value);
            }}/>
   
    </div>
    <br/>
       <div>
            <div class="group">
        <label>Re-type New </label>
        <input   type="text"  value={PassportNo} onChange={(e) => {
              setPassportNo(e.target.value);
            }}/>
   
    </div>
            {/* <span>
          <TextField
            //label="Repeat New Password"
            margin="dense"
            id="RepeatPassword"
           // value={PassportNo}
            onChange={(e) => {
              setPassportNo(e.target.value);
            }}
            type="text"
            variant="standard"
          /></span> */}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              disabled={loading}
              //onClick={handleButtonClick}
              onClick={updatePassword}
              size="medium"
            >
              Confirm
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "blue",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}