import {
  AddCategory,
  DeleteCategory,
  UpdateCategory,
  AllCategories,
} from "../components/categories";

const categories = () => {
  return (
    <>
      <center>
        <h1>Add category</h1>
      </center>
      <AddCategory></AddCategory>
      <hr />
      <center>
        <h1>delete category</h1>
      </center>
      <DeleteCategory />

      <hr />
      <center>
        <h1>update category</h1>
      </center>
      <UpdateCategory />

      <hr />

      <hr />
      <center>
        <h1>All categories</h1>
      </center>
      <AllCategories />
    </>
  );
};
export default categories;
