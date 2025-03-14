import { useForm } from "react-hook-form";
import { createArticle, updateArticle } from "../api/article";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

const ArticleForm = () => {
  const { token } = useAuth();
  console.log("Token inside ArticleForm:", token);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log("Submitting with token:", token, "Data:", data);
      if (id) {
        await updateArticle(token!, id, data);
      } else {
        await createArticle(token!, data);
      }
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error submitting article:", axiosError.response?.data);
      alert("Failed to submit");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
      <input {...register("title")} className="border p-2 w-full mb-4" placeholder="Title" />
      <textarea {...register("body")} className="border p-2 w-full mb-4" placeholder="Content"></textarea>
      <button type="submit" className="bg-blue-500 p-2 text-white">Submit</button>
    </form>
  );
};

export default ArticleForm;
