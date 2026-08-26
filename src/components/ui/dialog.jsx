'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Diálogo accesible sobre Radix.
 *
 * El modal de descarga del benchmark y el menú mobile estaban hechos a mano con
 * un div posicionado: sin `role="dialog"`, sin foco atrapado, sin cierre con
 * Escape, sin devolver el foco al botón que los abrió y sin bloquear el scroll
 * del fondo. Con el menú abierto se podía tabular hacia el contenido de atrás.
 *
 * Radix ya estaba en las dependencias y sin usar. Todo eso lo resuelve solo.
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'motion-reduce:animate-none',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(
  ({ className, children, mostrarCerrar = true, etiquetaCerrar = 'Cerrar', ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-[70] left-1/2 -translate-x-1/2 w-full max-w-md',
          'bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2',
          'max-h-[92vh] overflow-y-auto',
          'bg-surface-2 text-ink rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          'motion-reduce:animate-none',
          className,
        )}
        {...props}
      >
        {children}
        {mostrarCerrar && (
          <DialogPrimitive.Close
            aria-label={etiquetaCerrar}
            className="absolute right-6 top-6 rounded-full p-1 text-ink-subtle hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <X size={20} />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-2xl font-bold text-ink leading-tight tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-ink-muted', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
