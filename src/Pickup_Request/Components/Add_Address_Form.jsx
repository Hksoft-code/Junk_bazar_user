import { useEffect, useState } from "react";

import { getCountriesDetails } from "../../Services/user";
import { addAddrress } from "../../Services/pickupRequest";
import showErrorMessage from "../../utils/ErrorAlert";
import showSuccessMessage from "../../utils/SweetAlert";

const Add_Address_form = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [countriesAndStates, setcountriesAndStates] = useState([]);
  const [fullName, setFullName] = useState("");
  const [selectedDialCode, setDialCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchCountry = async () => {
    try {
      const response = await getCountriesDetails();

      const countriesAndStatesData = response;

      console.log("countriesAndStatesData", countriesAndStatesData);

      setcountriesAndStates(countriesAndStatesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("countriesAndStates", countriesAndStates);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;

    console.log("selectedCountry", selectedCountry);
    setSelectedCountry(selectedCountry);
    setSelectedState("");
  };
  // Get the list of states based on the selected country
  const states = selectedCountry
    ? countriesAndStates?.find((country) => country.iso2 === selectedCountry)
        ?.states || []
    : [];
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  // Get the list of cities based on the selected state
  const cities =
    states.filter((el) => {
      if (el.state_code === selectedState) return el.cities;
    })[0]?.cities || [];

  const handleCityChange = (event) => {
    const citySelected = event.target.value;

    setSelectedCity(citySelected);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCountry();
  }, []);

  const handleAddAddress = async () => {
    try {
      const addressRepo = await addAddrress(
        selectedCity,
        selectedCountry,
        selectedState,
        address,
        pincode,
        fullName,
        selectedDialCode,
        phoneNumber
      );
      console.log("Add Address Response", addressRepo);
      showSuccessMessage("Add Address Successfully", "success");
      const addresData = addressRepo.dat;
      if (addresData.statusCode === 200) {
        setSelectedCountry("");
        setSelectedState("");
      }
    } catch (error) {
      console.error("error", error);
      // const errorMessage = !error.response.data.error.message
      //   ? error.response.data.error?._message
      //   : error.response.data.error.message;
      // showErrorMessage(error.error.message, "error");
    }
  };

  return (
    <>
      <div class="">
        <div class="w-full max-w-3xl mx-auto p-2">
          <div class="bg-white:bg-gray-800 p-8 rounded-lg shadow-md border white:border-gray-700">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Add New Address
            </h1>
            <div className="col-span-6 sm:col-span-3">
              <div>
                <label className="block py-3 text-black">Enter Full Name</label>
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  <input
                    required
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    placeholder="Enter Full Name"
                    className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div className="col-span-6 sm:col-span-3">
                <div>
                  <label className="block py-3 text-black">Enter Address</label>
                  <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                    <input
                      required
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      placeholder="Enter Address"
                      className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-6">
              <div className="col-span-6 sm:col-span-3">
                <div className="grid  grid-cols-2 gap-6">
                  <div>
                    <label className="block py-3 text-black">
                      Select Country
                    </label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <div className="w-full">
                        <select
                          className="w-full bg-[#80d7421c] p-1"
                          value={selectedCountry}
                          onChange={handleCountryChange}
                        >
                          <option value="">Select Country</option>
                          {countriesAndStates.map((country) => (
                            <option key={country.iso2} value={country.iso2}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block py-3 text-black">
                      Select State
                    </label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <div className="w-full">
                        <select
                          className="w-full bg-[#80d7421c] p-1"
                          value={selectedState}
                          onChange={handleStateChange}
                        >
                          <option value="">Select State</option>
                          {states.map((stateObj) => (
                            <option
                              key={stateObj.state_code}
                              value={stateObj.state_code}
                            >
                              {stateObj.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <div className="grid  grid-cols-3 gap-6">
                  <div>
                    <label className="block py-3 text-black">DialCode</label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <input
                        required
                        defaultValue={selectedDialCode}
                        placeholder="Select DialCode"
                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block py-3 text-black">
                      Enter Phone Number
                    </label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxlength="10"
                        required
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                        placeholder="Enter Phone Number"
                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div className="col-span-6 sm:col-span-3">
                  <div className="grid  grid-cols-2 gap-6">
                    <div>
                      <label className="block py-3 text-black">
                        Enter Pincode
                      </label>
                      <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                        <input
                          type="number"
                          required
                          onChange={(e) => {
                            setPincode(e.target.value);
                          }}
                          placeholder="Enter Pincode"
                          className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block py-3 text-black">
                        Select City
                      </label>
                      <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                        <div className="w-full">
                          <select
                            className="w-full bg-[#80d7421c] p-1"
                            value={selectedCity}
                            disabled={!selectedState}
                            onChange={handleCityChange}
                          >
                            <option value="">Select City</option>
                            {cities.map((cityObj) => (
                              <option key={cityObj.id} value={cityObj.name}>
                                {cityObj.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-8 flex justify-end">
              <button
                onClick={handleAddAddress}
                class="bg-[#5AB344] text-white px-4 py-2 rounded-lg "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Address_form;
