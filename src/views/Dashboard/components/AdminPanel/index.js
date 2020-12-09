import React, { useState, useContext, useEffect } from 'react';
// import Cookies from "js-cookie";
import DjangoCSRFToken from 'django-react-csrftoken';

// Bring in the global and performance management context
import { GlobalContext } from '../../../../context/GlobalState';

// Material UI components

import { useStyles } from '../styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

// const csrftoken = Cookies.get("csrftoken");

// const DjangoCSRFToken = () => {
//   // return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
//   return <DjangoCSRFToken />;
// };

// console.log(DjangoCSRFToken());

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `data-upload-tab-${index}`,
    'aria-controls': `data-upload-tabpanel-${index}`,
  };
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStylesAdminPanel = makeStyles((theme) => ({
  formRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    display: 'flex',
  },
  modalPaper: {
    position: 'absolute',
    // width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  manageUsers: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 500,
  },
  tabsWidth: {
    maxWidth: 500,
  },
  root: {
    display: 'flex',
    borderRadius: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 500,
    flexDirection: 'column',
  },
  usersTable: {
    minWidth: 650,
  },
  color: {
    color: '#28354A',
  },

  margin: {
    margin: theme.spacing(1),
  },

  loginContainer: {
    height: 300,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
  },

  dataUploadContainer: {
    height: 600,
    display: 'flex',
    width: 900,
  },

  h4: {
    margin: 'auto',
  },

  formControl: {
    minWidth: 150,
  },

  year: {
    height: 35,
    width: 150,
    padding: 0,
  },
  dataUploadForm: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-evenly',
    margin: 40,
  },
  span: {
    marginTop: 10,
  },
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export function AdminPanel() {
  const {
    months,
    loginUser,
    userISC,
    registerUser,
    getAllUsers,
    getUserISCs,
    logoutUser,
    uploadData,
    isAuthenticated,
    isSuperUser,
    token,
    users,
  } = useContext(GlobalContext);

  // get & ISCs users
  useEffect(() => {
    getAllUsers();
    getUserISCs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStylesAdminPanel();
  const globalClasses = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [openAddUsers, setOpenAddUsers] = React.useState(false);
  const [openEditUsers, setOpenEditUsers] = React.useState(false);

  const handleOpenAddUserModal = () => {
    setOpenAddUsers(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUsers(false);
  };

  const handleOpenEditUserModal = () => {
    setOpenEditUsers(true);
  };

  const handleCloseEditUserModal = () => {
    setOpenEditUsers(false);
  };

  const [value, setValue] = useState(0);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [plannedTargetsYear, setPlannedTargetsYear] = useState(null);
  const [plannedTargetsDataFile, setPlannedTargetsDataFile] = useState(null);

  const [coverageTargetsYear, setCoverageTargetsYear] = useState(null);
  const [coverageTargetsDataFile, setCoverageTargetsDataFile] = useState(null);

  const [stockRequirementsYear, setStockRequirementsYear] = useState(null);
  const [stockRequirementsDataFile, setStockRequirementsDataFile] = useState(
    null
  );

  const [stockManagementDataYear, setStockManagementDataYear] = useState(null);
  const [stockManagementDataMonth, setStockManagementDataMonth] = useState(
    null
  );
  const [stockManagementDataFile, setStockManagementDataFile] = useState(null);

  const [performanceManagementYear, setPerformanceManagementYear] = useState(
    null
  );
  const [
    performanceManagementDataFile,
    setPerformanceManagementDataFile,
  ] = useState(null);

  const [coldChainDataFile, setColdChainDataFile] = useState(null);
  const [coldChainYear, setColdChainYear] = useState(null);
  const [coldChainMonth, setColdChainMonth] = useState(null);

  //User creation

  const [emailAddress, setEmailAddress] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userPasswordConfirm, setUserPasswordConfirm] = useState(null);
  const [isStaff, setIsStaff] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [accessArea, setAccessArea] = useState(null);
  const [userISC_ID, setUserISC_ID] = useState(null);
  const [accessLevel, setAccessLevel] = useState(null);
  const [superUserStatus, setSuperUserStatus] = React.useState(false);

  const accessLevels = ['Warehouse', 'District', 'IP'];

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(email, password);
  };

  const handleEditUser = async (event) => {
    event.preventDefault();

    alert('User edited');
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    if (userPassword !== userPasswordConfirm) {
      alert('Passwords do not match');

      return;
    }

    registerUser({
      password: userPassword,
      is_superuser: superUserStatus,
      email: emailAddress,
      is_staff: isStaff,
      is_active: isActive,
      access_level: accessLevel,
      access_area: accessArea,
      immunization_component: userISC_ID,
    });

    // Reset states
    setEmailAddress(null);
    setUserPassword(null);
    setUserPasswordConfirm(null);
    setIsStaff(true);
    setIsActive(false);
    setAccessArea(null);
    setUserISC_ID(null);
    setAccessLevel(null);
    setSuperUserStatus(false);
    // Close the model
    handleCloseAddUserModal();

    // refresh ui to show new users

    await getAllUsers();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logoutUser(token);
  };

  const handleDataUpload = (event, year, month, file, module) => {
    event.preventDefault();

    const data = {
      month,
      year,
      file,
      module,
    };
    uploadData(data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const stockManagementDataMonthFilter = months.map((month) => (
    <MenuItem value={month.key} key={month} className={classes.liItems}>
      {month.month}
    </MenuItem>
  ));

  const accessLevelsFilter = accessLevels.map((level) => (
    <MenuItem value={level} key={level}>
      {level}
    </MenuItem>
  ));

  const ISCFilter = userISC.map((isc) => (
    <MenuItem value={isc.id} key={isc.id} className={classes.liItems}>
      {isc.name}
    </MenuItem>
  ));

  const editUserModal = (user) => (
    <div style={modalStyle} className={classes.modalPaper}>
      <h4 className={classes.h4}>Edit User</h4>
      <form autoComplete='nope' id='edit-user-form' onSubmit={handleEditUser}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10,
            marginLeft: 40,
            width: 500,
          }}
        >
          <span className={classes.span}>Email Address</span>
          <TextField
            id='email_address'
            size='small'
            type='text'
            variant='outlined'
            name='create_user_email_address'
            value={user.email}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
      </form>
    </div>
  );

  const addUserModal = (
    <div style={modalStyle} className={classes.modalPaper}>
      <h4 className={classes.h4}>Add User</h4>
      <form
        autoComplete='nope'
        id='create-user-form'
        onSubmit={handleCreateUser}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10,
            marginLeft: 40,
            width: 500,
          }}
        >
          <span className={classes.span}>Email Address</span>
          <TextField
            id='email_address'
            size='small'
            type='text'
            variant='outlined'
            name='create_user_email_address'
            onChange={(e) => setEmailAddress(e.target.value)}
          />

          <span className={classes.span}>Password</span>
          <TextField
            id='password'
            size='small'
            type='password'
            variant='outlined'
            name='create_user_password'
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <span className={classes.span}>Password confirmation</span>
          <TextField
            id='password_confirmation'
            type='password'
            size='small'
            variant='outlined'
            name='password_confirmation'
            onChange={(e) => setUserPasswordConfirm(e.target.value)}
          />
          <h6>Enter the same password as above, for verification.</h6>
          <span className={classes.span}>Access level</span>
          <Select
            className={globalClasses.selector_background}
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
            inputProps={{
              id: 'access_level',
              name: 'access_level',
            }}
          >
            {accessLevelsFilter}
          </Select>
          <span className={classes.span}>Access Area</span>
          <Select
            className={globalClasses.selector_background}
            value={accessArea}
            onChange={(e) => setAccessArea(e.target.value)}
            inputProps={{
              id: 'access_level',
              name: 'access_level',
            }}
          >
            {accessLevelsFilter}
          </Select>
          <span className={classes.span}>Immunization System Component</span>
          <Select
            className={globalClasses.selector_background}
            value={userISC_ID}
            onChange={(e) => setUserISC_ID(e.target.value)}
            inputProps={{
              id: 'ISC',
              name: 'ISC',
            }}
          >
            {ISCFilter}
          </Select>

          <span className={classes.span}>Superuser status</span>
          <Checkbox
            checked={superUserStatus}
            color='primary'
            onChange={(e) => setSuperUserStatus(e.target.checked)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <h6>
            Designates that this user has all permissions without explicitly
            assigning them.
          </h6>
          <Button
            style={{ marginTop: 20 }}
            variant='outlined'
            type='submit'
            form='create-user-form'
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className={classes.root}>
      <div style={{ marginTop: 350 }}>
        <h2 style={{ margin: 0, color: '#28354A' }}>
          UNEPI Dashboard Administration
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 40,
          justifyContent: 'space-evenly',
        }}
      >
        {isAuthenticated ? (
          <>
            <Paper>
              <div
                style={{
                  padding: 30,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    marginBottom: 10,
                    marginLeft: 'auto',
                  }}
                >
                  <form
                    noValidate
                    autoComplete='off'
                    id='logout-form'
                    onSubmit={handleLogout}
                  >
                    <Button variant='outlined' type='submit' form='logout-form'>
                      Logout
                    </Button>
                  </form>
                </div>
                <div className={classes.formRoot}>
                  <Tabs
                    orientation='vertical'
                    variant='scrollable'
                    value={value}
                    onChange={handleChange}
                    aria-label='Vertical tabs example'
                    className={classes.tabs}
                  >
                    <Tab
                      className={classes.tabsWidth}
                      label='Manage Users'
                      {...a11yProps(0)}
                    />

                    <Tab
                      className={classes.tabsWidth}
                      label='Import Stock Management Files'
                      {...a11yProps(1)}
                    />
                    <Tab
                      className={classes.tabsWidth}
                      label='Import Stock Requirements Data (min / max)'
                      {...a11yProps(2)}
                    />
                    <Tab
                      className={classes.tabsWidth}
                      label='Import Coverage Targets'
                      {...a11yProps(3)}
                    />
                    <Tab
                      className={classes.tabsWidth}
                      label='Import Planned Targets'
                      {...a11yProps(4)}
                    />
                    <Tab
                      className={classes.tabsWidth}
                      label='Import Cold Chain data'
                      {...a11yProps(5)}
                    />
                    <Tab
                      className={classes.tabsWidth}
                      label='Import Performance Management Data'
                      {...a11yProps(6)}
                    />
                  </Tabs>
                  {isSuperUser && isAuthenticated ? (
                    <TabPanel value={value} index={0}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <h4>Manage Users</h4>
                        <div className={classes.buttonRoot}>
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={handleOpenAddUserModal}
                          >
                            Add Users
                          </Button>
                          <Modal
                            open={openAddUsers}
                            onClose={handleCloseAddUserModal}
                            aria-labelledby='Add users'
                            aria-describedby='Add users'
                          >
                            {addUserModal}
                          </Modal>
                        </div>
                      </div>
                      <TableContainer component={Paper}>
                        <Table
                          className={classes.table}
                          size='small'
                          aria-label='users table'
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell align='left'>Email Address</TableCell>
                              <TableCell align='left'>Access Level</TableCell>
                              <TableCell align='left'>Access Area</TableCell>
                              <TableCell align='left'>Is Admin</TableCell>
                              <TableCell align='left'>
                                Immunization Component
                              </TableCell>
                              <TableCell align='left'>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users?.isLoading ? (
                              <TableRow>
                                <TableCell
                                  component='th'
                                  scope='row'
                                  colSpan={7}
                                >
                                  <div className={classes.loadingSpinner}>
                                    <CircularProgress />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ) : (
                              <>
                                {users?.users?.map((user) => (
                                  <TableRow key={user.id}>
                                    <TableCell component='th' scope='row'>
                                      {user.id}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {user.email}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {user.access_level}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {user.access_area === null ? 'None' : ''}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {user.is_superuser === true ? (
                                        <CheckIcon color='action' />
                                      ) : (
                                        <CloseIcon color='secondary' />
                                      )}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {user.immunization_component?.name}
                                    </TableCell>
                                    <TableCell align='left'>
                                      <div className={classes.buttonRoot}>
                                        <Button
                                          variant='contained'
                                          color='primary'
                                          onClick={handleOpenEditUserModal}
                                        >
                                          Edit
                                        </Button>
                                        <Modal
                                          open={openEditUsers}
                                          onClose={handleCloseEditUserModal}
                                          aria-labelledby='Edit user'
                                          aria-describedby='Edit user'
                                        >
                                          {editUserModal(user)}
                                        </Modal>
                                        <Button
                                          variant='contained'
                                          color='primary'
                                        >
                                          Change Password
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                  ) : (
                    <TabPanel value={value} index={0}>
                      <p style={{ margin: 'auto' }}>
                        You have to be an admin user to manage users
                      </p>
                    </TabPanel>
                  )}
                  {isSuperUser && isAuthenticated ? (
                    <TabPanel value={value} index={1}>
                      <h4 className={classes.h4}>
                        Import Stock Management file
                      </h4>
                      <form
                        className={classes.dataUploadForm}
                        noValidate
                        autoComplete='off'
                        id='stock-management-file-form'
                        onSubmit={(e) =>
                          handleDataUpload(
                            e,
                            stockManagementDataYear,
                            stockManagementDataMonth,
                            stockManagementDataFile,
                            'stockManagement'
                          )
                        }
                      >
                        <DjangoCSRFToken />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label style={{ marginRight: 60 }}>Year</label>
                          <TextField
                            className={classes.year}
                            id='stock_management_file_year'
                            type='text'
                            variant='outlined'
                            name='year'
                            onChange={(e) =>
                              setStockManagementDataYear(e.target.value)
                            }
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label style={{ marginRight: 60 }}>Month</label>
                          <FormControl
                            className={classes.formControl}
                            variant='outlined'
                            margin='dense'
                          >
                            <Select
                              className={globalClasses.selector_background}
                              value={stockManagementDataMonth}
                              onChange={(event) =>
                                setStockManagementDataMonth(event.target.value)
                              }
                              inputProps={{
                                id: 'stock_management_file_month',
                                name: 'stock_management_file_month',
                              }}
                            >
                              {stockManagementDataMonthFilter}
                            </Select>
                          </FormControl>
                        </div>
                        <div>
                          <label style={{ marginRight: 30 }}>Data File</label>
                          <input
                            type='file'
                            name='import_file'
                            onChange={(e) =>
                              setStockManagementDataFile(e.target.files[0])
                            }
                          />
                        </div>
                        <Button
                          variant='outlined'
                          type='submit'
                          form='stock-management-file-form'
                        >
                          Submit
                        </Button>
                      </form>
                    </TabPanel>
                  ) : (
                    <TabPanel value={value} index={1}>
                      <p style={{ margin: 'auto' }}>
                        You have to be an admin user to import files
                      </p>
                    </TabPanel>
                  )}
                  {isSuperUser && isAuthenticated ? (
                    <TabPanel value={value} index={2}>
                      <h4 className={classes.h4}>
                        Import Stock Requirements Data (Min/Max)
                      </h4>
                      <form
                        className={classes.dataUploadForm}
                        noValidate
                        autoComplete='off'
                        id='stock-requirements-form'
                        onSubmit={(e) =>
                          handleDataUpload(
                            e,
                            stockRequirementsYear,
                            undefined,
                            stockRequirementsDataFile,
                            'stockManagementMinMax'
                          )
                        }
                      >
                        <DjangoCSRFToken />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label style={{ marginRight: 60 }}>Year</label>
                          <TextField
                            id='stock_requirement_year'
                            type='text'
                            variant='outlined'
                            name='name'
                            onChange={(e) =>
                              setStockRequirementsYear(e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label style={{ marginRight: 30 }}>Data File</label>
                          <input
                            type='file'
                            name='data_file'
                            onChange={(e) =>
                              setStockRequirementsDataFile(e.target.files[0])
                            }
                          />
                        </div>
                        <Button
                          variant='outlined'
                          type='submit'
                          form='stock-requirements-form'
                        >
                          Import
                        </Button>
                      </form>{' '}
                    </TabPanel>
                  ) : (
                    <TabPanel value={value} index={2}>
                      <p style={{ margin: 'auto' }}>
                        You have to be an admin user to import files
                      </p>
                    </TabPanel>
                  )}
                  {isSuperUser && isAuthenticated ? (
                    <TabPanel value={value} index={3}>
                      <h4 className={classes.h4}>Import Coverage targets</h4>
                      <form
                        className={classes.dataUploadForm}
                        noValidate
                        autoComplete='off'
                        id='coverage-targets-form'
                        onSubmit={(e) =>
                          handleDataUpload(
                            e,
                            coverageTargetsYear,
                            undefined,
                            coverageTargetsDataFile,
                            'coverageTargets'
                          )
                        }
                      >
                        <DjangoCSRFToken />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label style={{ marginRight: 60 }}>Year</label>
                          <TextField
                            id='coverage_targets_year'
                            type='text'
                            variant='outlined'
                            name='name'
                            onChange={(e) =>
                              setCoverageTargetsYear(e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label style={{ marginRight: 30 }}>Data File</label>
                          <input
                            type='file'
                            name='data_file'
                            onChange={(e) =>
                              setCoverageTargetsDataFile(e.target.files[0])
                            }
                          />
                        </div>
                        <Button
                          variant='outlined'
                          type='submit'
                          form='coverage-targets-form'
                        >
                          Import
                        </Button>
                      </form>
                    </TabPanel>
                  ) : (
                    <TabPanel value={value} index={3}>
                      <p style={{ margin: 'auto' }}>
                        You have to be an admin user to import files
                      </p>
                    </TabPanel>
                  )}
                  {isSuperUser && isAuthenticated ? (
                    <TabPanel value={value} index={4}>
                      <h4 className={classes.h4}>Import Planned targets</h4>

                      <form
                        className={classes.dataUploadForm}
                        noValidate
                        autoComplete='off'
                        id='planned-targets-form'
                        onSubmit={(e) =>
                          handleDataUpload(
                            e,
                            plannedTargetsYear,
                            undefined,
                            plannedTargetsDataFile,
                            'plannedTargets'
                          )
                        }
                      >
                        <DjangoCSRFToken />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label style={{ marginRight: 60 }}>Year</label>
                          <TextField
                            id='planned_targets_year'
                            type='text'
                            variant='outlined'
                            name='name'
                            onChange={(e) =>
                              setPlannedTargetsYear(e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label style={{ marginRight: 30 }}>Data File</label>
                          <input
                            type='file'
                            name='data_file'
                            onChange={(e) =>
                              setPlannedTargetsDataFile(e.target.files[0])
                            }
                          />
                        </div>
                        <Button
                          variant='outlined'
                          type='submit'
                          form='planned-targets-form'
                        >
                          Import
                        </Button>
                      </form>
                    </TabPanel>
                  ) : (
                    <TabPanel value={value} index={4}>
                      <p style={{ margin: 'auto' }}>
                        You have to be an admin user to import files
                      </p>
                    </TabPanel>
                  )}
                  {isSuperUser && isAuthenticated ? (
                    <TabPanel value={value} index={5}>
                      <h4 className={classes.h4}>
                        Import Cold chain data file
                      </h4>

                      <form
                        className={classes.dataUploadForm}
                        noValidate
                        autoComplete='off'
                        id='coldchain-management-form'
                        onSubmit={(e) =>
                          handleDataUpload(
                            e,
                            coldChainYear,
                            coldChainMonth,
                            coldChainDataFile,
                            'coldChain'
                          )
                        }
                      >
                        <DjangoCSRFToken />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label style={{ marginRight: 60 }}>Year</label>
                          <TextField
                            id='coldChain_year'
                            type='text'
                            variant='outlined'
                            name='name'
                            onChange={(e) => setColdChainYear(e.target.value)}
                          />
                        </div>
                        <div>
                          <label style={{ marginRight: 30 }}>Data File</label>
                          <input
                            type='file'
                            name='data_file'
                            onChange={(e) =>
                              setColdChainDataFile(e.target.files[0])
                            }
                          />
                        </div>
                        <Button
                          variant='outlined'
                          type='submit'
                          form='coldchain-management-form'
                        >
                          Import
                        </Button>
                      </form>
                    </TabPanel>
                  ) : (
                    <TabPanel value={value} index={5}>
                      <p style={{ margin: 'auto' }}>
                        You have to be an admin user to import files
                      </p>
                    </TabPanel>
                  )}
                  {isSuperUser && isAuthenticated ? (
                    <TabPanel value={value} index={6}>
                      <h4 className={classes.h4}>Import Workplan file</h4>
                      <form
                        className={classes.dataUploadForm}
                        noValidate
                        autoComplete='off'
                        id='performance-management-form'
                        onSubmit={(e) =>
                          handleDataUpload(
                            e,
                            performanceManagementYear,
                            undefined,
                            performanceManagementDataFile,
                            'performanceManagement'
                          )
                        }
                      >
                        <DjangoCSRFToken />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label style={{ marginRight: 60 }}>Year</label>
                          <TextField
                            id='performance_management_year'
                            type='text'
                            variant='outlined'
                            name='name'
                            onChange={(e) =>
                              setPerformanceManagementYear(e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label style={{ marginRight: 30 }}>Data File</label>
                          <input
                            type='file'
                            name='data_file'
                            onChange={(e) =>
                              setPerformanceManagementDataFile(
                                e.target.files[0]
                              )
                            }
                          />
                        </div>
                        <Button
                          variant='outlined'
                          type='submit'
                          form='performance-management-form'
                        >
                          Import
                        </Button>
                      </form>
                    </TabPanel>
                  ) : (
                    <TabPanel value={value} index={6}>
                      <p style={{ margin: 'auto' }}>
                        You have to be an admin user to import files
                      </p>
                    </TabPanel>
                  )}
                </div>
              </div>
            </Paper>
          </>
        ) : (
          <Paper>
            <form
              className={classes.loginContainer}
              noValidate
              autoComplete='off'
              id='login-form'
              onSubmit={handleLogin}
            >
              <TextField
                id='login_username'
                label='Email'
                type='text'
                variant='outlined'
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id='login_password'
                label='Password'
                type='password'
                variant='outlined'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant='outlined' type='submit' form='login-form'>
                Login
              </Button>
            </form>
          </Paper>
        )}
      </div>
    </div>
  );
}
