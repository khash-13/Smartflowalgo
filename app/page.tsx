"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  TrendingUp,
  BarChart2,
  BookOpen,
  Sliders,
  ShieldAlert,
  ArrowRight,
  CheckCircle,
  Award,
  Users,
  Layers,
  Heart,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  FileText,
  Badge,
  Sparkles,
  Lock,
  Mail,
  Phone,
  User,
  Clock,
  HelpCircle,
  Download,
  BarChart3,
} from "lucide-react";


import TelegramCTA from "../components/TelegramCTA";

// Data
import { blogPosts } from "../data/blogs";
import { plans } from "../data/plans";
import Home from "@/pages/main/Home";

export default function Page() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans flex flex-col transition-colors selection:bg-emerald-500/30 selection:text-emerald-500">
      {/* MAIN CONTAINER */}
      <main className="grow">
        <Home />
      </main>
    </div>
  );
}
