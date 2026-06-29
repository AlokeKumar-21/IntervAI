import { UserCircle, MapPin, Briefcase } from "lucide-react";

export default function ProfileHero({ profile }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 shadow-xl">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-6">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <UserCircle
              size={72}
              className="text-white"
            />
          </div>

          <div>

            <h1 className="text-4xl font-bold text-white">
              {profile?.fullName || "Your Name"}
            </h1>

            <div className="mt-2 flex flex-wrap gap-4 text-white/90">

              <div className="flex items-center gap-2">
                <Briefcase size={18} />
                <span>
                  {profile?.targetRole || "Target Role"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>
                  {profile?.location || "Location"}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}