
'use client'
import React from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { ArrowLeft, ArrowRight, QrCode } from 'lucide-react'

interface NewStrategiesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewStrategiesModal({ isOpen, onClose }: NewStrategiesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xl p-0">
            <DialogHeader>
                <DialogTitle>Nuevas Estrategias para Captar Reseñas</DialogTitle>
                <DialogDescription>
                    Ideas innovadoras para animar a tus clientes a dejar su opinión.
                </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6 relative">
                <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <QrCode className="h-8 w-8 text-primary" />
                    </div>
                    <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <Image 
                            src="https://picsum.photos/seed/qr-strategy/400/300"
                            alt="Estrategia QR en la mesa"
                            width={400}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">QR en la Mesa</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Coloca un QR en cada mesa que lleve directamente a tu perfil de Google o TripAdvisor. Fácil y directo.
                    </p>
                </div>

                <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-card/80 backdrop-blur-sm">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                 <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-card/80 backdrop-blur-sm">
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}
