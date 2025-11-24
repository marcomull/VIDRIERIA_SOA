"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AddPersonalForm } from "@/components/adminUsuarios/AddPersonalForm"; 
import { isAuthenticated, isAdmin } from "@/lib/auth"; 

export default function AgregarPersonalPage() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated() || !isAdmin()) {
            router.push("/login");
        }
    }, [router]);

    return (
        <DashboardLayout title="Agregar Nuevo Personal">
            <AddPersonalForm />
        </DashboardLayout>
    );
}