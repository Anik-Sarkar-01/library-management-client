import { useDeleteBookMutation, useGetBooksQuery } from "../../redux/api/baseApi";
import type { IBook } from "../../types";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Tooltip from "rc-tooltip";
import 'rc-tooltip/assets/bootstrap.css'


const BookList = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);
    const [deleteBook] = useDeleteBookMutation();

    if (isLoading) {
        return <p className="text-center">Loading...</p>
    }

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteBook(id).unwrap();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Book has been deleted.",
                        icon: "success"
                    });
                } catch (err) {
                    Swal.fire({
                        title: "Error!",
                        text: err instanceof Error ? err.message : "Something went wrong.",
                        icon: "error"
                    });
                }
            }
        });
    };


    return (
        <div>
            <div className="overflow-x-auto rounded-box border shadow border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>ISBN</th>
                            <th>Copies</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && data?.data.map((book: IBook, idx: number) => (
                            <tr key={book._id}>
                                <th>{idx + 1}</th>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.isbn}</td>
                                <td>{book.copies}</td>
                                <td>{book.available ? "Available" : "Unavailable"}</td>
                                <td className="text-2xl flex gap-5">
                                    <Tooltip placement="top" trigger={['hover']} overlay={<span>Edit</span>}>
                                        <Link to={`/edit-book/${book._id}`} >
                                            <FaEdit className="text-blue-500 hover:text-blue-600" />
                                        </Link>
                                    </Tooltip>
                                    <Tooltip placement="top" trigger={['hover']} overlay={<span>Delete</span>}>
                                        <button onClick={() => handleDelete(book._id)}>
                                            <MdDeleteForever className="text-red-500 hover:text-red-600" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip placement="top" trigger={['hover']} overlay={<span>Borrow</span>}>
                                        <Link to={`/borrow/${book._id}`}>
                                            <FiUserPlus className="text-green-500 hover:text-green-600" />
                                        </Link>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;