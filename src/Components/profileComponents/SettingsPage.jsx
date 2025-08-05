import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Eye, EyeOff } from "lucide-react";

const SettingsPage = ({ user }) => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateAddr, setStateAddr] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [nationalId, setNationalId] = useState("");

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      await axios.put(
        `${backendUrl}/api/users/update-info`,
        {
          name,
          password,
          dob,
          gender,
          phone,
          address: {
            street,
            city,
            state: stateAddr,
            postalCode,
            country,
          },
          nationalId,
        },
        { withCredentials: true }
      );

      toast.success("Information updated!");
      window.location.reload();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;

    try {
      await axios.delete(`${backendUrl}/api/users/delete-account`, { withCredentials: true });
      toast.success("Account deleted");
      window.location.href = "/";
    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  const handleOpenModal = () => {
    if (user) {
      setDob(user.dob || "");
      setGender(user.gender || "Male");
      setPhone(user.phone || "");
      setStreet(user.address?.street || "");
      setCity(user.address?.city || "");
      setStateAddr(user.address?.state || "");
      setPostalCode(user.address?.postalCode || "");
      setCountry(user.address?.country || "");
      setNationalId(user.nationalId || "");
    }
    setModalOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Account Settings</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm font-medium">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-8 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-8 right-3 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-end pt-4 border-t">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Complete Info
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all space-y-4">
                <Dialog.Title className="text-xl font-semibold text-center mb-4">Complete Your Information</Dialog.Title>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input" />
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="input">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="input" />
                  <input placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} className="input" />
                  <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="input" />
                  <input placeholder="State" value={stateAddr} onChange={(e) => setStateAddr(e.target.value)} className="input" />
                  <input placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="input" />
                  <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="input" />
                  <input placeholder="13-digit ID" maxLength={13} value={nationalId} onChange={(e) => setNationalId(e.target.value)} className="input col-span-2" />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save All
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SettingsPage;
