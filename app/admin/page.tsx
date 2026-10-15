import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { getOverview } from "../../lib/overview";
import AdminDashboardClient from "../components/AdminDashboardClient";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	const overview = await getOverview();

	return (
		<AdminDashboardClient stats={overview.stats} activities={overview.activities.slice(0, 5)} days={overview.days} user={session.user || {}} />
	);
}
