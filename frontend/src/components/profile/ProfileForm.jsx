import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm({
  profile,
  saveProfile,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    college: "",
    branch: "",
    graduationYear: "",
    targetRole: "",
    experience: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: "",
  });

  useEffect(() => {
    if (!profile) return;

    setFormData({
      fullName: profile.fullName || "",
      bio: profile.bio || "",
      college: profile.college || "",
      branch: profile.branch || "",
      graduationYear: profile.graduationYear || "",
      targetRole: profile.targetRole || "",
      experience: profile.experience || "",
      location: profile.location || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
      portfolio: profile.portfolio || "",
      skills: Array.isArray(profile.skills)
        ? profile.skills.join(", ")
        : profile.skills || "",
    });
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await saveProfile({
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    }
  };

  const fields = [
    ["fullName", "Full Name"],
    ["college", "College"],
    ["branch", "Branch"],
    ["graduationYear", "Graduation Year"],
    ["targetRole", "Target Role"],
    ["experience", "Experience"],
    ["location", "Location"],
    ["github", "GitHub"],
    ["linkedin", "LinkedIn"],
    ["portfolio", "Portfolio"],
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900">

      <h2 className="text-2xl font-bold text-slate-900">
        Edit Profile
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        {fields.map(([name, label]) => (
          <div key={name}>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              {label}
            </label>

            <input
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>
        ))}

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium text-slate-600">
          Skills
        </label>

        <input
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />

      </div>

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium text-slate-600">
          Bio
        </label>

        <textarea
          rows={5}
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        />

      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
      >
        Save Changes
      </button>

    </div>
  );
}