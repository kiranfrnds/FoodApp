/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {
  Avatar,
  Button,
  Typography,
  Grid,
  Pagination,
  TextField,
  Modal,
  DialogTitle,
} from "@mui/material";
import Navbar from "./Navbar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [deleteId, setDeleteId] = useState<any>("");
  const [list, setList] = useState<any>([]);
  const [datas, setDatas] = useState<any>([]);
  const [openDailoue, setOpenDailoue] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editId, setEditId] = useState<any>(null);
  const navigate = useNavigate();
  const [tableItems, setTableItems] = useState({
    name: "",
    price: "",
    discountPrice: "",
    weight: "",
    packingCharges: "",
    unit: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    getData();
  }, []);

  //get list of products
  const getData = async () => {
    const data: any = sessionStorage.getItem("logindata");
    const jsonData: any = JSON.parse(data);
    const token: any = jsonData?.token;
    console.log(token, "token");

    await fetch(
      "https://extended-retail-app.herokuapp.com/api/products/getMenuItems?userId=624a61bbd873b1d7b1bc78bc",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        setList(respo.data);
        setDatas(respo.data);
      });
  };

  const handleOpenDialouge = (_id: any) => {
    setDeleteId(_id);
    setOpenDailoue(true);
  };

  const handleCloseDailouge = () => {
    setOpenDailoue(false);
  };

  const handleChange = (e: any) => {
    setTableItems({
      ...tableItems,
      [e.target.name]: e.target.value,
    });
  };

  const {
    name,
    discountPrice,
    price,
    weight,
    packingCharges,
    stock,
    description,
  } = tableItems;

  const addNewProduct = async () => {
    // add product//

    const TableData = {
      name: name,
      stock: stock,
      unit: "gms",
      weight: weight,
      price: price,
      isVeg: true,
      image:
        "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/hyderabadi-biryani-recipe-chicken.jpg",
      discountPrice: discountPrice,
      packingCharges: 25,
      description: description,
      enabled: true,
      customerId: "624a61bbd873b1d7b1bc78bc",
    };

    const data: any = sessionStorage.getItem("logindata");
    const jsonData: any = JSON.parse(data);
    const token = jsonData.token;

    await fetch(
      "https://extended-retail-app.herokuapp.com/api/products/createMenuItem",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(TableData),
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        console.log("result-came", respo);
        sessionStorage.setItem("menuItem", JSON.stringify(respo));
        if (respo?.success) {
        } else {
          toast(respo?.message);
        }
      });
    navigate("/product");
    setOpen(false);

    getData();
    setTableItems({
      name: "",
      price: "",
      discountPrice: "",
      weight: "",
      packingCharges: "",
      stock: "",
      unit: "",
      description: "",
    });
  };

  const handleSearch = ({ target }: any) => {
    var text = target?.value?.toUpperCase()?.trim();
    console.log("==!", text);

    if (!text) {
      setList(datas);
      return;
    }
    var temparr = [];
    temparr = datas.filter((item: any) =>
      item?.name?.toUpperCase()?.trim()?.includes(text)
    );
    setList(temparr);
    console.log("temparr", temparr);
  };

  //Delete Item from List
  const handleDeleteItem = async () => {
    const data: any = sessionStorage.getItem("logindata");
    console.log("logindata", data);
    const jsonData: any = JSON.parse(data);
    const token = jsonData.token;
    const userId = jsonData?.data?._id;

    fetch(
      `https://extended-retail-app.herokuapp.com/api/products/deleteMenuItem?userId=${userId}&itemId=${deleteId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((resp: any) => {
        getData();
        console.log(resp.data);
      })
      .catch((err: any) => console.log(err));

    setOpenDailoue(false);
  };

  const handleEditItem = (item: any) => {
    console.log("EditeItemId", item._id);
    setEditId(item._id);
    setTableItems({
      name: item.name,
      discountPrice: item.discountPrice,
      price: item.price,
      weight: item.weight,
      packingCharges: item.packingCharges,
      stock: item.stock,
      unit: item.unit,
      description: item.description,
    });
    setOpen(true);
  };
  //Edit Item from List
  const saveEditedItem = async () => {
    const data: any = sessionStorage.getItem("logindata");
    const jsonData: any = JSON.parse(data);
    console.log("JsonData", jsonData);

    const token = jsonData.token;
    const userId = jsonData.data._id;

    const editeData = {
      name: name,
      discountPrice: discountPrice,
      price: price,
      weight: weight,
      packingCharges: packingCharges,
      stock: stock,
      description: description,
    };

    console.log("MoreIds", userId, editId, token);

    await fetch(
      `https://extended-retail-app.herokuapp.com/api/products/updateMenuItem?userId=${userId}&itemId=${editId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(editeData),
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        console.log("response-Come", respo);
        if (respo?.success) {
        } else {
          toast(respo?.message);
        }
        setOpen(false);
        getData();
      });
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="product-bar">
        <h4 className="product-heading">Product List</h4>
        <div className="product-bars">
          <div className="product-search">
            <input
              type="text"
              placeholder="search..."
              className="input-search"
              onChange={handleSearch}
              data-testid="search-input"
            />
            <SearchIcon className="search-icon" />
          </div>
          <div className="product-bars-btn">
            <Button
              className="product-button"
              sx={{ color: "white" }}
              onClick={handleOpen}
            >
              ADD NEW PRODUCT
            </Button>
            <AddIcon className="add-icon" />
            <Modal
              open={open}
              onClose={handleClose}
              style={{ overflowY: "scroll" }}
            >
              <Grid
                container
                spacing={3}
                style={{
                  width: "72%",
                  backgroundColor: "white",
                  position: "absolute",
                  padding: "20px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  marginTop: "11pc",
                }}
              >
                <Grid item lg={6}>
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: "Bai Jamjuree" }}
                    gutterBottom
                  >
                    Product Image
                  </Typography>

                  <img
                    width="100%"
                    src="https://res.cloudinary.com/dn6ltw1mm/image/upload/v1655293232/Rectangle_199_ulzysz.png"
                    alt="module"
                  />
                </Grid>

                <Grid container item lg={6} spacing={3}>
                  <Grid item lg={12} md={6} sm={11}>
                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                    >
                      Product Name
                    </Typography>
                    <TextField
                      className="fInput"
                      placeholder="Pizza"
                      style={{
                        width: "100%",
                        fontFamily: "Montserrat Alternates",
                      }}
                      type="text"
                      variant="outlined"
                      name="name"
                      // eslint-disable-next-line no-restricted-globals
                      value={name}
                      onChange={handleChange}
                      required={true}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6}>
                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                    >
                      Price
                    </Typography>
                    <TextField
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                      type="number"
                      variant="outlined"
                      name="price"
                      placeholder="180"
                      value={price}
                      onChange={handleChange}
                      required={true}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6}>
                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                    >
                      Discount Price
                    </Typography>
                    <TextField
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                      type="number"
                      variant="outlined"
                      name="discountPrice"
                      placeholder="175"
                      value={discountPrice}
                      onChange={handleChange}
                      required={true}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={3}>
                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                    >
                      Stock
                    </Typography>
                    <TextField
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                      type="number"
                      variant="outlined"
                      placeholder="25"
                      name="stock"
                      value={stock}
                      onChange={handleChange}
                      required={true}
                    />
                  </Grid>
                  {/* <br /> */}
                  <Grid item lg={4} md={4} sm={4}>
                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                    >
                      Weight
                    </Typography>
                    <TextField
                      type="number"
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                      variant="outlined"
                      name="weight"
                      placeholder="Weight-KG"
                      value={weight}
                      onChange={handleChange}
                      required={true}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={4}>
                    <Typography
                      style={{
                        fontWeight: "530",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                    >
                      Charges
                    </Typography>
                    <TextField
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                      type="text"
                      variant="outlined"
                      name="packingCharges"
                      placeholder="15"
                      value={packingCharges}
                      onChange={handleChange}
                      required={true}
                    />
                  </Grid>
                  <Grid item lg={12} md={10} sm={11}>
                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}
                    >
                      Description
                    </Typography>
                    <textarea
                      style={{
                        width: "100%",
                        height: "100px",
                        marginTop: 5,
                        borderRadius: "13px solid black",
                        fontFamily: "Montserrat Alternates",
                      }}
                      name="description"
                      placeholder="Type Here..."
                      value={description}
                      onChange={handleChange}
                      required={true}
                    />
                  </Grid>

                  <Grid item>
                    {editId ? (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: { xs: 200, lg: 270 } }}
                        style={{ marginTop: 15 }}
                        onClick={saveEditedItem}
                      >
                        Update Product
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: { xs: 200, lg: 270 } }}
                        style={{ marginTop: 15 }}
                        type="submit"
                        onClick={addNewProduct}
                      >
                        Save Product
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Modal>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="responsive"></div>
        <Paper
          sx={{
            width: "100%",
            boxShadow: "5px 10px 8px 10px #888888",
            border: "1px solid rgb(74, 72, 78)",
            overflow: "hidden",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#DF201F",
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "Bai Jamjuree",
                      fontWeight: 500,
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#DF201F",
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "Bai Jamjuree",
                      fontWeight: 500,
                    }}
                  >
                    Units
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#DF201F",
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "Bai Jamjuree",
                      fontWeight: 500,
                    }}
                  >
                    Stock
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#DF201F",
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "Bai Jamjuree",
                      fontWeight: 500,
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#DF201F",
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "BaiJamjuree",
                      fontWeight: 500,
                    }}
                  >
                    Discount Price
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#DF201F",
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "Bai Jamjuree",
                      fontWeight: 500,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list?.map((eachItem: any, index: any) => {
                  return (
                    <TableRow
                      className="list-items-table"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={eachItem._id}
                    >
                      <TableCell>
                        <span className="items-table">
                          <Avatar alt="Remy Sharp" src={eachItem.image} />
                          <Typography
                            sx={{
                              color: "#A2A3A5",
                              fontSize: 18,
                              ml: 2,
                              fontFamily: "BaiJamjuree",
                              fontWeight: 500,
                            }}
                          >
                            {eachItem.name}
                          </Typography>
                        </span>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#A2A3A5",
                          fontSize: 18,
                          fontFamily: "BaiJamjuree",
                          fontWeight: 500,
                        }}
                      >
                        {eachItem.unit}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#A2A3A5",
                          fontSize: 18,
                          fontFamily: "BaiJamjuree",
                          fontWeight: 500,
                        }}
                      >
                        {eachItem.stock}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#A2A3A5",
                          fontSize: 18,
                          fontFamily: "BaiJamjuree",
                          fontWeight: 500,
                        }}
                      >
                        {eachItem.price}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#A2A3A5",
                          fontSize: 18,
                          fontFamily: "BaiJamjuree",
                          fontWeight: 500,
                        }}
                      >
                        {eachItem.discountPrice}
                      </TableCell>
                      <TableCell>
                        <div className="actions">
                          <span className="button-edit task-button product-button">
                            <EditIcon
                              className="button-edit"
                              data-testid="edit-product"
                              onClick={() => handleEditItem(eachItem)}
                            />
                          </span>
                          <span
                            className="button-delete task-button"
                            onClick={() => handleOpenDialouge(eachItem._id)}
                          >
                            <DeleteIcon className="button-delete" />
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Pagination
              className="primary"
              count={5}
              siblingCount={0}
              variant="outlined"
              shape="rounded"
              color="secondary"
              style={{ float: "right", marginTop: 10, marginRight: 50 }}
            />
          </TableContainer>
        </Paper>
      </div>
      <div>
        <Dialog
          open={openDailoue}
          onClose={handleCloseDailouge}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete the item ? "}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={handleCloseDailouge}
              variant="contained"
              color="error"
            >
              No
            </Button>
            <Button
              onClick={handleDeleteItem}
              autoFocus
              variant="contained"
              color="success"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ProductList;
