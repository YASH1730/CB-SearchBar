"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchBar;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _material = require("@mui/material");

var _xDataGrid = require("@mui/x-data-grid");

var _Pagination = _interopRequireDefault(require("@mui/material/Pagination"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CustomPagination() {
  const apiRef = (0, _xDataGrid.useGridApiContext)();
  const page = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridPageSelector);
  const pageCount = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridPageCountSelector);
  return /*#__PURE__*/_react.default.createElement(_Pagination.default, {
    color: "primary",
    count: pageCount,
    page: page + 1,
    onChange: (event, value) => apiRef.current.setPage(value - 1)
  });
}

function SearchBar() {
  const [courseList, setCourseList] = (0, _react.useState)([]);
  const [rows, setRows] = (0, _react.useState)([]); // handelSeacrch bar

  const handelSearch = async e => {
    console.log(e.target.value);
    const SearchParam = e.target.value;

    if (SearchParam.length >= 5) {
      // For fetching the data for database
      await _axios.default.get("https://api.classbazaar.com/api/v2/courses/?q=".concat(e.target.value, "&filter=&subjects=all&provider=all&feeFilter=&startDateFilter=&providerOffset=0::0::0::0::0::0::0")).then(data => {
        setCourseList(data.data.data);
        console.log(data.data.data);
      }).catch(err => {
        console.log(err);
      });
    }
  }; // defining the Columns for the data grid


  const columns = [{
    field: 'id',
    headerName: 'Id',
    width: 100
  }, {
    field: 'provider',
    headerName: 'Provider',
    width: 100
  }, {
    field: 'title',
    headerName: 'Title',
    width: 500
  }, {
    field: 'price',
    headerName: 'Price',
    width: 50
  }, {
    field: 'subjects',
    headerName: 'Subjects',
    width: 200
  }, {
    field: 'university',
    headerName: 'University',
    width: 200
  }, {
    field: 'ranking_points',
    headerName: 'Ranking Points',
    width: 100
  }];
  (0, _react.useEffect)(() => {
    setRows(courseList.map(row => {
      return {
        id: row.index,
        provider: row.provider,
        title: row.title,
        subjects: row.subjects,
        university: row.university,
        ranking_points: row.ranking_points
      };
    }));
  }, [courseList]);
  return (
    /*#__PURE__*/
    // MainContainer
    _react.default.createElement(_material.Grid, {
      container: true,
      sx: {
        marginTop: '5%',
        gap: '50px'
      }
    }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
      xs: 12
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "h5",
      align: "center"
    }, "Search Bar By ClassBazar")), /*#__PURE__*/_react.default.createElement(_material.Grid, {
      xs: 8,
      sx: {
        boxShadow: 2
      },
      margin: "auto"
    }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
      fullWidth: true,
      id: "outlined-search",
      label: "Search Courses",
      type: "search",
      onChange: handelSearch
    })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
      xs: 11,
      sx: {
        boxShadow: 2
      },
      margin: "auto"
    }, courseList !== [] && /*#__PURE__*/_react.default.createElement(_material.Box, {
      sx: {
        height: 400,
        width: '100%'
      }
    }, /*#__PURE__*/_react.default.createElement(_xDataGrid.DataGrid, {
      rows: rows,
      columns: columns,
      pagination: true,
      pageSize: 5,
      rowsPerPageOptions: [5],
      components: {
        Pagination: CustomPagination
      }
    }))))
  ); // MainContainer ends
}