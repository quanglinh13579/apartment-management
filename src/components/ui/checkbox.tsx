import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import CheckedIcon from "../Icons/CheckedIcon"
import UncheckedIcon from "../Icons/UncheckedIcon"

import { cn } from "../../lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex items-center justify-center h-size-checkbox w-size-checkbox shrink-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <UncheckedIcon size={22} className="absolute inset-0" />
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center absolute inset-0 bg-white")}
    >
      <CheckedIcon size={22} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
