import { useEffect, useState } from "react";
import location from "../assets/PNG/location.png";
import axiosInstance from "../api-config/axiosInstance";
import SettingsInput from "../Components/Setting/SettingInput";
import add from "../assets/PNG/add.png";
import edit from "../assets/PNG/edit.png";
import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";
const Profile = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const [state, setState] = useState({
    firstName: "Andy",
    lastName: "Singh",
    currentPassword: "123456",
    newPassword: "1234567",
  });
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfileData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getCurrentUser");
      console.log("get User data", response);

      if (response.status === 200) {
        const data = JSON.parse(response.data.data);
        setProfileData(data);
        console.log("get Profile of user ", data);
      } else {
        console.error("Unexpected server response:", response);
        // Handle the error or redirect to login page
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error or redirect to login page
    }
  };

  useEffect(() => {
    fetchData();
  }, [axiosInstance]);

  return (
    <>
      <Nav />
      <div className=" mt-20 lg:mt-32  lg:max-w-[1550px] mx-auto">
        <section className=" pt-[43%] md:pt-[23%] lg:pt-[8%] shadow h-full p-5">
          <div className="pb-4 border-b border-b-[rgba(149, 152, 154, 0.5)]">
            <h2 className="text-[24px] font-semibold text-[#4A4A4A]">
              Profile
            </h2>
            <p className="text-[#707070] text-[16px] pt-1">
              Real time information about your account
            </p>
          </div>
          <div className="pb-5 pt-4 border-b border-b-[rgba(149, 152, 154, 0.5)]">
            <div className="flex justify-between">
              <div className="flex">
                <img src={profile.profileUrl} alt="" />
                <span className="mt-8">
                  <h2 className="font-semibold text-[#343434] text-[24px]">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <span className="flex">
                    <img
                      src={location}
                      alt=""
                      className="w-[11.85px] h-[16.93px] mt-2"
                    />
                    <p className="font-[400] text-[20.32px] text-[#4A4A4A] mr-2 ml-2">
                      India
                    </p>
                  </span>
                </span>
              </div>
              {/* <div className="flex mt-8">
              <Button
                label="Upload New Picture"
                classname="text-[14px] font-[600] text-[#4A4A4A] bg-white rounded-[8px] w-[186px] h-[45px] mr-4 btn-shadow"
              />
              <Button
                label="Delete"
                classname="rounded-[8px] text-[#4A4A4A] text-[14px] font-[600] w-[102px] h-[45px] bg-[#B6B6B673]"
              />
            </div> */}
            </div>
            <div className="mt-5 w-full">
              <p className="text-[24px] font-semibold mb-2">Full Name</p>
              <form className="flex">
                <SettingsInput label="First Name" value={profile.firstName} />
                <SettingsInput label="Last Name" value={profile.lastName} />
              </form>
            </div>
          </div>
          <div className="pt-4 pb-6 border-b border-b-[rgba(149, 152, 154, 0.5)]">
            <h2 className="font-semibold text-[24px] text-[#343434]">
              Contact Details
            </h2>
            <p className="text-[16px] text-[#707070]">
              Edit your contact information from here
            </p>
            <span className="flex justify-between mt-2">
              <p></p>
              <span>
                <img
                  src={add}
                  alt=""
                  className="w-[20px] h-[20px] absolute mt-4 ml-4"
                />
                {/* <Button
              label="Add Another Number"
              classname="text-[#4A4A4A] btn-shadow text-[14px] font-semibold rounded-[8px] w-[231px] p-4 bg-white"
            /> */}
              </span>
            </span>
            <p className="font-[400] text-[18px] text-[#343434] flex">
              +91-{profile.phoneNumber}{" "}
              {/* <img
            src={edit}
            alt=""
            className="w-[11.88px] h-[11.88px] mt-2 ml-1 cursor-pointer"
          /> */}
            </p>
            <p className="font-[500] text-[18px] text-[#343434] flex">
              {profile.address}{" "}
              <img
                src={edit}
                alt=""
                className="w-[11.88px] h-[11.88px] mt-2 ml-1 cursor-pointer"
              />
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
