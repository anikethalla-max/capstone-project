import { useForm } from "react-hook-form";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
function RoleSelection() {
  const {
    getToken
  } = useAuth();
  const {
    isLoaded
  } = useUser();
  const navigate = useNavigate();
  const {
    setCurrentUser
  } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    defaultValues: {
      role: ""
    }
  });
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  const onSubmit = async formData => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/user-api/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          role: formData.role
        })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Profile creation failed");
      }
      const resBody = await res.json();
      const role = resBody.payload.role;
      setCurrentUser(resBody.payload);
      if (role === "USER") {
        navigate("/user-dashboard");
      } else {
        navigate("/author-dashboard");
      }
    } catch (err) {
      console.error("Role selection error:", err);
      alert(err.message);
    }
  };
  return <div className="role-selection">
      <p className="eyebrow">Make yourself at home</p><h1>How will you join in?</h1><p className="text-secondary">Choose your role to get started.</p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <label className="role-option">
          <input type="radio" value="USER" {...register("role", {
          required: "Please select a role"
        })} />
          <span><strong>Reader</strong><small>Discover articles and join the conversation.</small></span>
        </label>


        <label className="role-option">
          <input type="radio" value="AUTHOR" {...register("role", {
          required: "Please select a role"
        })} />
          <span><strong>Author</strong><small>Publish your ideas and share your expertise.</small></span>
        </label>

        {errors.role && <p style={{
        color: "red"
      }}>{errors.role.message}</p>}

        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>;
}
export default RoleSelection;
