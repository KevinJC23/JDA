import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<"div"> {
  imageUrl?: string;
  imageAlt?: string;
  imageClassName?: string;
  orientation?: "vertical" | "horizontal";
}

function Card({ 
  className, 
  imageUrl, 
  imageAlt = "", 
  imageClassName,
  orientation = "vertical",
  children,
  ...props 
}: CardProps) {
  const cardContent = (
    <div
      data-slot="card-content-wrapper"
      className={cn(
        "flex flex-col gap-6",
        orientation === "horizontal" && imageUrl && "sm:flex-row sm:items-center"
      )}
    >
      {imageUrl && (
        <div 
          className={cn(
            "relative overflow-hidden rounded-lg",
            orientation === "vertical" && "aspect-video w-full",
            orientation === "horizontal" && "aspect-square w-full sm:w-48 flex-shrink-0",
            imageClassName
          )}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-6 flex-1">
        {children}
      </div>
    </div>
  )

  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground rounded-xl border shadow-sm overflow-hidden",
        !imageUrl && "flex flex-col gap-6 py-6", 
        className
      )}
      {...props}
    >
      {imageUrl ? (
        <div className="p-6">
          {cardContent}
        </div>
      ) : (
        cardContent
      )}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)} 
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center [.border-t]:pt-6", className)} 
      {...props}
    />
  )
}

function CardImage({ 
  src, 
  alt = "", 
  className,
  aspectRatio = "video", 
  ...props 
}: {
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg",
        aspectRatio === "video" && "aspect-video",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "portrait" && "aspect-[3/4]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        {...props}
      />
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardImage,
}