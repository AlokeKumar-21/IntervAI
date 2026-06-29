import { Camera, FileText, Upload, UserCircle } from "lucide-react";

export default function ProfileSidebar({
  profile,
  uploadImage,
  uploadCV,
}) {
  const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      await uploadImage(file);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      await uploadCV(file);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">

      {/* Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

        <div className="flex flex-col items-center">

          {profile?.profileImage ? (
            <img
             src={`${BASE_URL}/${profile.profileImage}`}
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <UserCircle
              size={110}
              className="text-indigo-500"
            />
          )}

          <h2 className="mt-4 text-xl font-bold">
            {profile?.fullName || "User"}
          </h2>

          <p className="text-slate-500">
            {profile?.email}
          </p>

          <label className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700">
            <Camera size={18} />
            Upload Photo

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </label>

        </div>

      </div>

      
          {/* Resume Card */}
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

  <div className="flex items-center gap-2">
    <FileText className="text-indigo-600" />
    <h3 className="font-semibold">
      Resume
    </h3>
  </div>

  {profile?.resume ? (
    <div className="mt-4">

      <p className="text-green-600 font-medium">
        ✅ Resume Uploaded
      </p>

      <a
       href={`${BASE_URL}/${profile.resume}`}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-indigo-600 hover:underline"
      >
        View Resume
      </a>

    </div>
  ) : (
    <p className="mt-3 text-sm text-slate-500">
      No resume uploaded.
    </p>
  )}

  <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 px-4 py-6 transition hover:bg-indigo-50">

    <Upload />

    <span>Upload Resume</span>

    <input
      type="file"
      accept=".pdf"
      hidden
      onChange={handleResumeUpload}
    />

  </label>

</div>

    </div>
  );
}