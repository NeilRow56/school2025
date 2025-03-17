import { Button } from '@/components/ui/button'
import { FileIcon, PlusCircle } from 'lucide-react'
import Link from 'next/link'

interface iAppProps {
  title: string
  description: string
  buttonText: string
  href: string
}

export function EmptyState({
  buttonText,
  description,
  href,
  title
}: iAppProps) {
  return (
    <div className='animate-in fade-in-50 flex flex-col items-center justify-center rounded-md border-4 border-dashed p-8 text-center'>
      <div className='bg-primary/10 flex size-20 items-center justify-center rounded-full'>
        <FileIcon className='text-primary size-10' />
      </div>
      <h2 className='mt-6 text-xl font-semibold'>{title}</h2>
      <p className='text-muted-foreground mx-auto mt-2 mb-8 max-w-sm text-center text-sm leading-tight'>
        {description}
      </p>

      <Button asChild>
        <Link href={href}>
          <PlusCircle className='mr-2 size-4' /> {buttonText}
        </Link>
      </Button>
    </div>
  )
}
