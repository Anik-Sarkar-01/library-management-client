import { useParams } from "react-router";
import { useGetBookQuery, useUpdateBookMutation } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

export default function EditBook() {

    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useGetBookQuery(id);
    const [updateBook] = useUpdateBookMutation();

    if (isLoading) {
        return <p className="text-center">Loading...</p>
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            await updateBook({ id, ...data }).unwrap();
            toast.success("Book updated successfully")
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (err) {
            toast.error("Something went wrong")
        }
    };


    return (
        <div className="card bg-[#FEFDE9] w-full max-w-2xl mx-auto my-8 shrink-0 shadow-2xl">
            <div className="card-body">
                <h2 className="text-2xl text-center font-semibold">Edit Book - {data.data.title}</h2>
                <form onSubmit={handleSubmit} className="fieldset space-y-2">
                    <div>
                        <label className="label">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="input input-bordered w-full"
                            placeholder="Book title"
                            required
                            defaultValue={data.data.title}
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
                            defaultValue={data.data.author}
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="label">Genre</label>
                        <select defaultValue={data.data.genre} name="genre" required className="select w-full">
                            <option disabled={true}>Genre</option>
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
                            defaultValue={data.data.isbn}
                        />
                    </div>

                    <div>
                        <label className="label">Description</label>
                        <textarea name="description" className="textarea w-full" placeholder="Description" defaultValue={data.data.description}></textarea>
                    </div>

                    <div>
                        <label className="label">Copies</label>
                        <input
                            type="number"
                            name="copies"
                            className="input input-bordered w-full"
                            placeholder="Copies"
                            required
                            defaultValue={data.data.copies}
                        />
                    </div>

                    <div>
                        <button className="btn btn-neutral mt-4 w-full">Update Book</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
