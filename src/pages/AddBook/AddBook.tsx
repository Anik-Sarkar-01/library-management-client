import { useNavigate } from "react-router";
import { useAddBookMutation } from "../../redux/api/baseApi";
import toast from 'react-hot-toast';


export default function AddBook() {
  const navigate = useNavigate();
  const [addBook] = useAddBookMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fromInputs = Object.fromEntries(formData.entries());

    const payload = {
      ...fromInputs,
      copies: Number(fromInputs.copies),
      available: true,
    };

    try {
      await addBook(payload).unwrap();
      toast.success("Book created successfully")
      navigate('/books');
    }
    catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;
      toast.error(error?.data?.message || "Something went wrong");
    }

  };

  return (
    <div className="card bg-[#FEFDE9] w-full max-w-2xl mx-auto my-8 shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-2xl text-center font-semibold">Add Book</h2>
        <form onSubmit={handleSubmit} className="fieldset space-y-2">
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              placeholder="Book title"
              required
            />
          </div>

          <div>
            <label className="label">Author</label>
            <input
              type="text"
              name="author"
              className="input input-bordered w-full"
              placeholder="Author name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="label">Select Genre</label>
            <select defaultValue="Select Genre" name="genre" required className="select w-full">
              <option disabled={true}>Select Genre</option>
              <option>FICTION</option>
              <option>NON_FICTION</option>
              <option>SCIENCE</option>
              <option>HISTORY</option>
              <option>BIOGRAPHY</option>
              <option>FANTASY</option>
            </select>
          </div>

          <div>
            <label className="label">ISBN</label>
            <input
              type="text"
              name="isbn"
              className="input input-bordered w-full"
              placeholder="ISBN number"
              required
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea name="description" className="textarea w-full" placeholder="Description"></textarea>
          </div>

          <div>
            <label className="label">Copies</label>
            <input
              type="number"
              name="copies"
              className="input input-bordered w-full"
              placeholder="Copies"
              required
            />
          </div>

          <div>
            <button className="btn btn-neutral mt-4 w-full">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  )
}
