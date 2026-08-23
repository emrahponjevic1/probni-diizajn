import { redirect } from "next/navigation";

export default function StudentskiBoniRedirectPage() {
  redirect("/meni?type=student");
}
