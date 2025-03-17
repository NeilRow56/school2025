import React, { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { usePathname } from 'next/navigation'
import { SubmitButton } from '@/components/shared/submit-button'
import { categorySchema } from '@/schemas/category'
import { Input } from '@/components/ui/input'
import { addCategory, updateCategory } from '@/app/actions/category_actions'
import { toast } from 'sonner'
import { Category } from '@/app/(dashboard)/categories/columns'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  category?: Category
}

function AddCategoryDialog({ setOpen, open, category }: Props) {
  const path = usePathname()

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '' }
  })

  useEffect(() => {
    if (category) {
      form.setValue('id', category.category_id)
      form.setValue('name', category.category_name)
    }
  }, [category, form])

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      if (category) {
        await updateCategory(category.category_id, values.name, path)
        toast('Category updated')
      } else {
        await addCategory(values.name, path)
        toast('Category created')
      }

      form.reset()
    } catch (error) {
      console.log(error)
      toast('Failed to perform action')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-1'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder='category name' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='w-[120px] py-2'>
                <SubmitButton text='Save' />
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
