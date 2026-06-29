import ProfileHero from "../components/profile/ProfileHero";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileForm from "../components/profile/ProfileForm";
import { Loader2 } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

export default function Profile() {
  const {
    profile,
    loading,
    saveProfile,
    uploadImage,
    uploadCV,
  } = useProfile();

  if (loading) {
  return (
   <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
     <p className="font-medium text-slate-600 dark:text-slate-300">
        Loading Profile...
      </p>
    </div>
  );
}

  return (
  <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

      <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">

        {/* Hero */}
        <ProfileHero profile={profile} />

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Sidebar */}
          <div>
            <ProfileSidebar
              profile={profile}
              uploadImage={uploadImage}
              uploadCV={uploadCV}
            />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ProfileForm
              profile={profile}
              saveProfile={saveProfile}
            />
          </div>

        </div>

      </div>

    </div>
  );
}