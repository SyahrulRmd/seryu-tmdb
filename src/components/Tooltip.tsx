import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

const TooltipRoot = TooltipPrimitive.Root

const TooltipProvider = forwardRef<
  ElementRef<typeof TooltipPrimitive.Provider>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>
>(({ children, ...props }, ref) => (
  <TooltipPrimitive.Provider delayDuration={300} {...props}>
    <TooltipRoot>
      {children}
    </TooltipRoot>
  </TooltipPrimitive.Provider>
))

const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ children, ...props }, ref) => (
  <TooltipPortal>
    <TooltipPrimitive.Content
      sideOffset={4}
      ref={ref}
      className='data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade z-50 text-black select-none rounded-md bg-white px-[15px] py-[10px] text-[15px] shadow-lg leading-none will-change-[transform,opacity]'
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-white" />
    </TooltipPrimitive.Content>
  </TooltipPortal>
))

export { TooltipProvider, TooltipTrigger, TooltipContent } 
