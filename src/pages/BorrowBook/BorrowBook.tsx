import { useNavigate, useParams } from "react-router";
import { useBorrowBookMutation, useGetBookQuery } from "../../redux/api/baseApi"
import toast from "react-hot-toast";

export default function BorrowBook() {
    const navigate = useNavigate();
    const { bookId } = useParams<{ bookId: string }>();
    const { data, isLoading } = useGetBookQuery(bookId);
    const [borrowBook] = useBorrowBookMutation();

    if (isLoading) {
        return <p className="text-center">Loading...</p>
    }

    const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fromInputs = Object.fromEntries(formData.entries());

        const payload = {
            book: bookId,
            quantity: Number(fromInputs.quantity),
            dueDate: fromInputs.dueDate
        };

        try {
            await borrowBook(payload).unwrap();
            toast.success("Book borrowed successfully")
            navigate('/borrow-summary');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="card bg-[#FEFDE9] w-full max-w-2xl mx-auto my-8 shrink-0 shadow-2xl">
            <div className="card-body">
                <h2 className="text-2xl text-center font-semibold">Borrow Book - {data.data.title}</h2>
                <form onSubmit={handleBorrow} className="fieldset space-y-2">

                    <div className="space-y-2">
                        <label className="label">Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            className="input input-bordered w-full"
                            placeholder="Quantity"
                            required
                        />
                        {
                            (data.data.copies >= 1) ? <p className="text-green-500">Available Quantity - {data.data.copies}</p> : <p className="text-red-500">Available Quantity - {data.data.copies}</p>
                        }
                    </div>

                    <div>
                        <label className="label">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            className="input input-bordered w-full"
                            placeholder="Select Date"
                            required
                        />
                    </div>

                    <div>
                        {
                            (data.data.copies >= 1) ? <button className="btn btn-neutral mt-4 w-full">Borrow Book</button> : <button className="btn btn-gray-200 mt-4 w-full" disabled>Book is Unavailable</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
