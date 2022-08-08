import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUser, getSearchUser, getSortedData } from "../slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Pagination from "react-responsive-pagination";
import { TextField } from "@mui/material";
import { useDebounce } from "use-debounce";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUser({ initialEntry: 0, finalEntry: pageSize }));
  }, []);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBtn,setSortBtn]=useState(false);
  const [searchField,setSearchField]=useState('');
  const [text] = useDebounce(searchField, 1000);

  useEffect(()=>{
    // if(searchField===''){
      dispatch(getAllUser( sortBtn ?{initialEntry: 0, finalEntry: pageSize,sort:"id",order:"desc"}: { initialEntry: 0, finalEntry: pageSize,searchData:searchField  }));
    // }
    // else{
    //   dispatch(getSearchUser(searchField));
    // }
    
  },[text,sortBtn]);

  const totalPages = 5;
  let pageSize = 5;
  const allUser = useSelector((state) => state.userReducer.user);
  const sortedDatas = useSelector((state) => state.userReducer.sortedArray);
  console.log("sortedData", sortedDatas);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    toast.success("User deleted successfully");

    setTimeout(() => {
      dispatch(getAllUser());
    }, 100);
  };
  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };
  const handlePageChange = (pages) => {
    setCurrentPage(pages);
    if (pages === 1) {
      dispatch(getAllUser( sortBtn ?{initialEntry: 0, finalEntry: pageSize,sort:"id",order:"desc"}: { initialEntry: 0, finalEntry: pageSize  }));
    } else {
      dispatch(
        getAllUser(sortBtn ? {
          initialEntry: pageSize * pages - pageSize,
          finalEntry: pageSize * pages,
          sort:"id",order:"desc"
        } : {
          initialEntry: pageSize * pages - pageSize,
          finalEntry: pageSize * pages,
        })
      );
    }
  };

  const handleHomePage=()=>{
    dispatch(getAllUser({ initialEntry: 0, finalEntry: pageSize }));
    setSearchField('');
  }

  return (
    <div>
      <div className="d-flex flex-column gap-3 my-4 justify-content-center align-items-center ">
        <Button variant="outlined" onClick={() => navigate("/adduser")}>
          Add user
        </Button>
        <Button variant="outlined" onClick={() => setSortBtn(true)} >
          sort data
        </Button>
        <form  className="d-flex align-items-center">
          <TextField value={searchField} onChange={(e)=>setSearchField(e.target.value)} type='text' className='h-25 w-50' id="outlined-basic" label="search" variant="outlined" />
          <Button type="submit" variant="outlined" >
            search
          </Button>
        </form>
        <Button onClick={handleHomePage} variant="contained" >
          Homepage
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell align="right">UserName</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUser.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {currentPage === 1
                        ? index + 1
                        : currentPage * pageSize - pageSize + 1 + index}
                    </TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleEdit(user.id)}
                        variant="contained"
                      >
                        Edit user
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="contained"
                      >
                        Delete user
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="m-5 d-flex justify-content-end">
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={(e) => handlePageChange(e)}
        />
      </div>
    </div>
  );
};

export default Home;
