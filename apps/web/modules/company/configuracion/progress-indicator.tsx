import { cn } from "@meetzen/ui/src/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 rounded-full transition-all",
            currentStep > i ? "bg-primary w-8" : "bg-muted w-6"
          )}
        />
      ))}
    </div>
  );
}
