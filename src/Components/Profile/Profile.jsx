const ProfileEdit = (props) => {
  const setData = props?.data;
  return (
    <div>
      <div class="flex justify-center mt-20 px-8">
        <form class="max-w-2xl">
          <div class="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
            <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">
              Account settings:
            </h2>

            <div class="flex flex-col gap-2 w-full border-gray-400">
              <div className="grid gap-6 grid-cols-2">
                <div>
                  <label class="text-gray-600 dark:text-gray-400">
                    First Name
                  </label>
                  <input
                    defaultValue={setData.firstName}
                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="text"
                  />
                </div>
                <div>
                  <label class="text-gray-600 dark:text-gray-400">
                    Second Name
                  </label>
                  <input
                    defaultValue={setData.lastName}
                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="text"
                  />
                </div>
              </div>

              <div>
                <label class="text-gray-600 dark:text-gray-400">
                  Phone Number
                </label>
                <input
                  defaultValue={setData.phoneNumber}
                  class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  type="text"
                />
              </div>

              {/* <div>
                <label class="text-gray-600 dark:text-gray-400">Address</label>
                <input
                  defaultValue={setData.address}
                  class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                  name="bio"
                ></input>
              </div> */}
              <div class="flex justify-end">
                <button
                  class="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                  type="submit"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
