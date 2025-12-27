/**
 * StatCard Component - Brazilian Tropical Modernism
 * Animated statistics card with gradient accents
 */

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  description?: string;
  color?: "emerald" | "golden" | "sky";
  index?: number;
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  description,
  color = "emerald",
  index = 0,
}: StatCardProps) {
  const colorClasses = {
    emerald: {
      bg: "bg-primary/10",
      icon: "text-primary",
      value: "text-primary",
    },
    golden: {
      bg: "bg-secondary/20",
      icon: "text-secondary",
      value: "text-secondary-foreground",
    },
    sky: {
      bg: "bg-accent/10",
      icon: "text-accent",
      value: "text-accent",
    },
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${classes.bg}`}>
              <Icon className={`w-6 h-6 ${classes.icon}`} />
            </div>
            <div className="flex-1">
              <p className={`font-mono text-3xl font-bold ${classes.value}`}>
                {value}
              </p>
              <p className="font-display text-sm text-foreground mt-1">
                {label}
              </p>
              {description && (
                <p className="text-xs text-muted-foreground mt-2">
                  {description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
