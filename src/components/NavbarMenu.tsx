"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import {
  BriefcaseBusiness,
  ChevronRight,
  Contact,
  House,
  Menu,
  TableOfContents,
} from "lucide-react";

export default function NavbarMenu() {
  const pendingScrollRef = useRef<string | null>(null);

  const handleOnLinkClick = (id: string) => {
    pendingScrollRef.current = id;
  };

  const handleOnAnimationEnd = (open: boolean) => {
    if (open) {
      return;
    }

    document.documentElement.classList.add("scroll-smooth");

    if (!pendingScrollRef.current) {
      return;
    }

    const link = document.createElement("a");
    link.href = `#${pendingScrollRef.current}`;
    link.click();

    pendingScrollRef.current = null;
  };

  const handleOnOpenChange = (open: boolean) => {
    if (open) {
      document.documentElement.classList.remove("scroll-smooth");
    }
  };

  return (
    <Drawer
      onOpenChange={handleOnOpenChange}
      onAnimationEnd={handleOnAnimationEnd}
    >
      <DrawerTrigger asChild>
        <Button className="flex md:hidden" size="icon" variant="outline">
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="hidden">Menu</DrawerTitle>
          <DrawerDescription className="hidden">
            Secciones del sitio
          </DrawerDescription>
          <div className="flex flex-col gap-2">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOnLinkClick("home")}
              >
                <House className="mr-4 size-4" />
                Inicio
                <ChevronRight className="ml-auto size-4" />
              </Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOnLinkClick("services")}
              >
                <TableOfContents className="mr-4 size-4" />
                Servicios
                <ChevronRight className="ml-auto size-4" />
              </Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOnLinkClick("projects")}
              >
                <BriefcaseBusiness className="mr-4 size-4" />
                Proyectos
                <ChevronRight className="ml-auto size-4" />
              </Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleOnLinkClick("contact")}
              >
                <Contact className="mr-4 size-4" />
                Contacto
                <ChevronRight className="ml-auto size-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Cerrar Menu</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
