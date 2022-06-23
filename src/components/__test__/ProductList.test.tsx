import { fireEvent, render, screen } from "@testing-library/react";
import ProductList from "../ProductList";
import { BrowserRouter as Router } from "react-router-dom";

async function DeleteItem(id: any) {
  try {
    const result = await fetch(
      `https://extended-retail-app.herokuapp.com/api/products/deleteMenuItem?userId=625560b4ab86f4c9bc8cc5ec&itemId=${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: "b6cb2180-f2b9-11ec-82c5-2af52baa4d7a1655963999",
        },
      }
    );
    const data = await result.json();
    if (data.status === 200) {
      return true;
    }
  } catch (error) {
    return null;
  }
}
const TableData = {
  name: "Some",
  stock: "stock",
  unit: "gms",
  weight: 1,
  price: 30,
  isVeg: true,
  image:
    "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/hyderabadi-biryani-recipe-chicken.jpg",
  discountPrice: 12,
  packingCharges: 25,
  description: "description",
  enabled: true,
  customerId: "624a61bbd873b1d7b1bc78bc",
};

describe("ProductList", () => {
  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementationOnce(() => {});
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
  });

  it("snapshot", () => {
    const { asFragment } = render(
      <Router>
        <ProductList />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders product list", () => {
    render(
      <Router>
        <ProductList />
      </Router>
    );
    expect(screen.getByText("Product List")).toBeInTheDocument();
  });
  // it("delete Item", async () => {
  //   render(
  //     <Router>
  //       <ProductList />
  //     </Router>
  //   );
  //   const deleteButton = screen.getByText("Yes");
  //   fireEvent.click(deleteButton);
  //   const result = await DeleteItem(1);
  //   expect(result).toBe(true);
  // });

  it("Adds new Item", async () => {
    render(
      <Router>
        <ProductList />
      </Router>
    );
    const addButton = screen.getByText(/ADD NEW PRODUCT/i);
    fireEvent.click(addButton);
    const result = await fetch(
      `https://extended-retail-app.herokuapp.com/api/products/createMenuItem`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: "b6cb2180-f2b9-11ec-82c5-2af52baa4d7a1655963999",
        },
        body: JSON.stringify(TableData),
      }
    );
    const data = await result;
    expect(data.status).toBe(200);
  }, 15000);

  it("renders Add new Item button", async () => {
    render(
      <Router>
        <ProductList />
      </Router>
    );
    const addButton = screen.getByText(/ADD NEW PRODUCT/i);
    expect(addButton).toBeInTheDocument();
  });

  it("renders search input Field", async () => {
    render(
      <Router>
        <ProductList />
      </Router>
    );
    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
  });
  it("renders table data", async () => {
    render(
      <Router>
        <ProductList />
      </Router>
    );
    const tableData = screen.getByText(/Name/i);
    expect(tableData).toBeInTheDocument();
  });
  it("open modal when edit button is clicked", async () => {
    render(
      <Router>
        <ProductList />
      </Router>
    );
    const editButton = screen.getByTestId("edit-product");
    fireEvent.click(editButton);
    expect(/Product Name/i).toBeInTheDocument();
  });
});
