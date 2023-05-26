import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from '../../../utilis/axios'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userProfilePost } from "../../../utilis/constants";
const ProfileUpdate = () => {
  const user_id = Cookies.get("user_id");

  const [user, setUser] = useState("");
  
  const navigate = useNavigate();
  const { register, setValue, handleSubmit } = useForm();
  useEffect(() => {
    axios
      .get(`${userProfilePost}/${user_id}`)
      .then((res) => {
        setUser(res.data.serdata);
        
        setValue("firstName", res.data.serdata.firstname);
        setValue("lastName", res.data.serdata.lastname);
        setValue("email", res.data.serdata.email);
        setValue("phone", res.data.serdata.phone);
      });
  }, [user_id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('firstName',data.firstName)
    formData.append('lastName',data.lastName)
    formData.append('email',data.email)
    formData.append('phone',data.phone)
    formData.append('image',data.image[0])

    axios
      .put(`${"http://127.0.0.1:8000/user/userUpdate"}/${user_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data"  },
      })
      .then((res) => {
        // setUser(res.data)
        // console.log(res.data);
        if (res.data.status === "true") {
          toast.success("Your Profile is Updated..", {
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          navigate("/userprofile");
        } else {
          toast.error("Invalid Email and Password!!", {
            position: "top-right",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      });
  };

  return (
    <>
      <div class="card " style={{ width: "60rem", marginLeft: "18rem" }}>
        <div class="card-body">
          <form enctype="multipart/form-data"  onSubmit={handleSubmit(onSubmit)}>
            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">First Name</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input
                  type="text"
                  class="form-control"
                  name="firstName"
                  {...register("firstName")}
                  defaultValue={user && user.firstname}
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">Last Name</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input
                  type="text"
                  class="form-control"
                  name="lastName"
                  {...register("lastName")}
                  defaultValue={user && user.lastname}
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">Email</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input
                  type="text"
                  class="form-control"
                  name="email "
                  {...register("email")}
                  defaultValue={user && user.email}
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">Phone</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input
                  type="text"
                  class="form-control"
                  name="phone"
                  {...register("phone")}
                  defaultValue={user && user.phone}
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-sm-3">
                <h6 class="mb-0">Profile Picture</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <input type="file" class="form-control" name="image"{...register('image')} />
              </div>
            </div>

            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-9 text-secondary">
                <input
                  type="submit"
                  class="btn btn-primary px-4"
                  value="Save Changes"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
