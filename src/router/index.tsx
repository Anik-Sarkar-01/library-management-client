import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import EditBook from "../pages/EditBook/EditBook";
import AddBook from "../pages/AddBook/AddBook";
import BookList from "../features/BookList/BookList";
import BorrowSummary from "../pages/BorrowSummary/BorrowSummary";
import BorrowBook from "../pages/BorrowBook/BorrowBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/books",
        element: <BookList></BookList>
      },
      {
        path: "/edit-book/:id",
        element: <EditBook></EditBook>
      },
      {
        path: "/create-book",
        element: <AddBook></AddBook>
      },
      {
        path: "/borrow/:bookId",
        element: <BorrowBook></BorrowBook>
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary></BorrowSummary>
      }
    ]
  },
]);

export default router;