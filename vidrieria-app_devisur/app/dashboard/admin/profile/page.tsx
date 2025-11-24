"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { isAuthenticated, isAdmin } from "@/lib/auth";
import { UserProfileContent } from "@/components/userPassword/UserProfileContent"; 

export default function AdminProfilePage() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated() || !isAdmin()) {
            router.push("/login");
        }
    }, [router]);
    

    return (
        <DashboardLayout title="Mi Perfil">
            <UserProfileContent />
        </DashboardLayout>
    );
}