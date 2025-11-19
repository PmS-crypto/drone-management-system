/**
 * Modern icon system using Lucide React
 * Icons are optimized for clarity and modern dashboard aesthetics
 * Following best practices from Linear, Vercel, and other top dashboards
 * 
 * Icons use consistent stroke width (1.5) for visual harmony
 * Size is controlled via className (e.g., w-6 h-6) for flexibility
 */

import {
  LayoutDashboard,
  Bell,
  Drone,
  ShieldAlert,
  Users,
  Clock,
  FileText,
  ChevronRight,
  X,
  Check,
  Activity,
  Circle,
} from 'lucide-react';

interface IconProps {
  className?: string;
  size?: number;
}

// Wrapper components to maintain compatibility with existing code
// When className includes size (w-X h-X), size prop is ignored
export function DashboardIcon({ className, size }: IconProps) {
  return <LayoutDashboard className={className} size={size} strokeWidth={1.5} />;
}

export function AlertIcon({ className, size }: IconProps) {
  return <Bell className={className} size={size} strokeWidth={1.5} />;
}

export function DroneIcon({ className, size }: IconProps) {
  return <Drone className={className} size={size} strokeWidth={1.5} />;
}

export function ThreatIcon({ className, size }: IconProps) {
  return <ShieldAlert className={className} size={size} strokeWidth={1.5} />;
}

export function GuardIcon({ className, size }: IconProps) {
  return <Users className={className} size={size} strokeWidth={1.5} />;
}

export function TimelineIcon({ className, size }: IconProps) {
  return <Clock className={className} size={size} strokeWidth={1.5} />;
}

export function EvidenceIcon({ className, size }: IconProps) {
  return <FileText className={className} size={size} strokeWidth={1.5} />;
}

export function ChevronRightIcon({ className, size }: IconProps) {
  return <ChevronRight className={className} size={size} strokeWidth={1.5} />;
}

export function XIcon({ className, size }: IconProps) {
  return <X className={className} size={size} strokeWidth={1.5} />;
}

export function CheckIcon({ className, size }: IconProps) {
  return <Check className={className} size={size} strokeWidth={1.5} />;
}

export function ActivityIcon({ className, size }: IconProps) {
  return <Activity className={className} size={size} strokeWidth={1.5} />;
}

export function StatusIcon({ className, size }: IconProps) {
  return <Circle className={className} size={size} strokeWidth={1.5} fill="currentColor" />;
}

