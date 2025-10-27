
'use client'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"
import { Button } from '@/app/components/ui/button'
import { Copy, Send, Edit } from 'lucide-react'

interface EmailTemplatesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const templates = [
    {
        category: 'Gestión de Quejas o Incidencias',
        subject: 'Tu experiencia en [Nombre del Restaurante] nos importa',
        body: `Hola [Nombre Cliente],

Soy Lola, la asistente de IA de [Nombre del Restaurante]. Hemos visto tu reseña y lamentamos mucho que tu experiencia no haya sido la que esperabas.

Nos tomamos tus comentarios muy en serio y nos gustaría saber más para poder mejorar.

¿Nos darías otra oportunidad? Nos encantaría invitarte a un café o postre en tu próxima visita.

Gracias por tu tiempo,
El equipo de [Nombre del Restaurante]`
    },
    {
        category: 'Información Menús para Eventos',
        subject: 'Celebra con nosotros en [Nombre del Restaurante]',
        body: `Hola [Nombre Cliente],

¿Buscas el lugar perfecto para tu próximo evento? En [Nombre del Restaurante] tenemos menús especiales para grupos y celebraciones.

Consulta nuestras opciones aquí: [Enlace a Menús]

Estaremos encantados de ayudarte a organizar un día inolvidable.

Un saludo,
El equipo de [Nombre del Restaurante]`
    }
]


export default function EmailTemplatesModal({ isOpen, onClose }: EmailTemplatesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
            <DialogHeader>
                <DialogTitle>Plantillas de Email</DialogTitle>
                <DialogDescription>
                    Usa estas plantillas para agilizar tu comunicación o crea las tuyas propias.
                </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                <Tabs defaultValue="personalizadas" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="personalizadas">Plantillas Personalizadas</TabsTrigger>
                        <TabsTrigger value="automaticas">Plantillas Automáticas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personalizadas">
                        <Accordion type="single" collapsible className="w-full">
                            {templates.map((template, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>{template.category}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="font-semibold text-sm mb-1">Asunto:</p>
                                            <p className="text-sm text-muted-foreground mb-4">{template.subject}</p>
                                            <p className="font-semibold text-sm mb-1">Cuerpo del mensaje:</p>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{template.body}</p>
                                            <div className="flex justify-end gap-2 mt-4">
                                                <Button variant="outline" size="sm"><Copy className="mr-2 h-4 w-4" /> Copiar</Button>
                                                <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Editar</Button>
                                                <Button size="sm"><Send className="mr-2 h-4 w-4" /> Enviar</Button>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                    <TabsContent value="automaticas">
                        <div className="text-center text-muted-foreground p-8">
                            <p>Aquí aparecerán las plantillas automáticas una vez configuradas.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DialogContent>
    </Dialog>
  )
}
