import React,{useState,useEffect} from "react";
import { TextField, Typography, Grid, Box } from "@mui/material";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}



export default function SearchBar() {

const [courseList,setCourseList] = useState([])
const [rows,setRows] = useState([])

// handelSeacrch bar
  const handelSearch = async(e) =>{
    console.log(e.target.value)

    const SearchParam = e.target.value;

    if(SearchParam.length >= 5)
    {

      // For fetching the data for database
      await axios.get(`https://api.classbazaar.com/api/v2/courses/?q=${e.target.value}&filter=&subjects=all&provider=all&feeFilter=&startDateFilter=&providerOffset=0::0::0::0::0::0::0`)
      .then((data)=>{
        setCourseList(data.data.data);
        console.log(data.data.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    

  }

   // defining the Columns for the data grid

const columns = [
  {field : 'id',headerName : 'Id',width : 100},
  {field : 'provider',headerName : 'Provider',width : 100},
  {field : 'title',headerName : 'Title',width : 500},
  {field : 'price',headerName : 'Price',width : 50},
  {field : 'subjects',headerName : 'Subjects',width : 200},
  {field : 'university',headerName : 'University',width : 200},
  {field : 'ranking_points',headerName : 'Ranking Points',width : 100}];

  useEffect(() => {
    
    setRows(courseList.map((row)=>{
  
      return ({
        id : row.index,
        provider : row.provider,
        title : row.title,
        subjects : row.subjects,
        university : row.university,
        ranking_points : row.ranking_points
      })}))
    
  }, [courseList]);


 



  return (
// MainContainer
<Grid container sx={{  marginTop : '5%',gap : '50px' }}>

        {/* Heading section */}
        <Grid xs={12}>
          <Typography variant="h5" align="center">
            Search Bar By ClassBazar
          </Typography>
        </Grid>


        {/* Search Bar Secton  */}
        <Grid xs={8} sx = {{boxShadow: 2}} margin = 'auto'>
          <TextField
          fullWidth 
          id="outlined-search"
          label="Search Courses"
          type="search" 
          onChange = {handelSearch}
          />
        </Grid>

        {/* Data Grid Section  */}
        <Grid xs={11} sx = {{boxShadow: 2}} margin = 'auto'>
        
        {
        courseList !== [] && 
        <Box sx={{ height: 400, width: '100%' }}>
<DataGrid
  rows = {rows}
  columns = {columns}
  pagination
  pageSize={5}
  rowsPerPageOptions={[5]}
  components={{
    Pagination: CustomPagination,
  }}
/>
</Box> }
        </Grid>
      </Grid>
  );
// MainContainer ends
}