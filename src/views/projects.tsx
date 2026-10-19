import AppLayout from "@/layout/app.layout";
import { FolderGit2 } from "lucide-react";;
import Banner from "@/components/banner";
import ProjectCard from "@/components/project-card";

export default function Projects() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <Banner
          icon={FolderGit2}
          title="Projects"
          description="View and manage your x86 assembly projects."
        />

        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProjectCard key={i} />
          ))}
        </div>

      </div>
    </AppLayout>
  );
}
