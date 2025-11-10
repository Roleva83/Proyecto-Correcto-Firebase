
'use client'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { Video, Star } from 'lucide-react'

interface TrainingCapsulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const capsules = {
    sala: [
        "**El arte de la bienvenida:** La primera impresión es la que cuenta. Recibe siempre con una sonrisa y contacto visual.",
        "**Upselling sin presionar:** En lugar de '¿quieres postre?', prueba con '¿os apetece probar nuestro coulant de chocolate? Es el favorito de la casa'.",
        "**Gestión de quejas:** Escucha activamente, empatiza y ofrece una solución. Un cliente insatisfecho recuperado es un cliente fiel.",
        "**Video: Lenguaje corporal positivo:** Aprende a transmitir confianza y amabilidad. [Ver video ›](https://www.youtube.com/watch?v=example)"
    ],
    cocina: [
        "**Consistencia es clave:** Asegúrate de que cada plato que sale sea idéntico al anterior en sabor y presentación.",
        "**Optimización del tiempo:** Prepara tu 'mise en place' de forma eficiente antes de cada servicio.",
        "**Comunicación en equipo:** Una comunicación clara y concisa con el personal de sala evita errores y retrasos."
    ],
    gestion: [
        "**Analiza tus datos:** Dedica 15 minutos al día a revisar las métricas de Lola IA. ¿Qué plato es el más rentable? ¿Qué reseñas negativas se repiten?",
        "**Feedback constructivo:** Cuando hables con tu equipo sobre su rendimiento, céntrate en los datos y en soluciones, no en culpas."
    ]
}

export default function TrainingCapsulesModal({ isOpen, onClose }: TrainingCapsulesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0">
            <DialogHeader>
                <DialogTitle>Cápsulas Formativas para el Equipo</DialogTitle>
                <DialogDescription>
                    Consejos rápidos y prácticos para mejorar el rendimiento de tu personal.
                </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="sala">
                        <AccordionTrigger>Sala</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4 pl-4">
                                {capsules.sala.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                        <p dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="cocina">
                        <AccordionTrigger>Cocina</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-4 pl-4">
                                 {capsules.cocina.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                        <p dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="gestion">
                        <AccordionTrigger>Gestión</AccordionTrigger>
                        <AccordionContent>
                           <ul className="space-y-4 pl-4">
                                 {capsules.gestion.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                        <p dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </DialogContent>
    </Dialog>
  )
}
