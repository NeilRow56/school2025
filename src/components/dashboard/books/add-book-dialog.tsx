import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../../ui/dialog'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../../ui/command'
import { Input } from '../../ui/input'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../ui/button'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, Loader } from 'lucide-react'

import { usePathname } from 'next/navigation'
import { getCategories } from '@/app/actions/category_actions'
import { Book } from '@/app/(dashboard)/list/books/columns'
import { addBook, updateBook } from '@/app/actions/book_actions'
import { toast } from 'sonner'
import { catalogueSchema } from '@/schemas/catalog'

// import ImageDropzone from '../shared/ImageDropzone'

type CatalogueProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  // We get Book from the exported type in (catalogue )/columns. This has been extended from the Book in prisma/client
  book?: Book
}

function AddBookDialog({ open, setOpen, book }: CatalogueProps) {
  const [categories, setCategories] = useState<
    { category_id: number; category_name: string }[]
  >([])

  const [processing, setProcessing] = useState(false)
  const path = usePathname()

  const form = useForm<z.infer<typeof catalogueSchema>>({
    resolver: zodResolver(catalogueSchema),
    defaultValues: {
      name: '',
      isbn: '',
      author: '',
      noOfCopies: 1,
      category: [],
      photos: [],
      publishYear: new Date().getFullYear()
    }
  })

  useEffect(() => {
    ;(async () => {
      const cats = await getCategories(0, -1)
      setCategories(cats.data)
    })()
  }, [])

  useEffect(() => {
    if (book) {
      form.setValue('id', book.bookId)
      form.setValue('name', book.name)
      form.setValue('isbn', book.isbn)
      form.setValue('noOfCopies', book.noOfCopies)
      form.setValue('publishYear', book.publishYear)
      form.setValue(
        'category',
        book.bookCategoryLinks?.map(c => c.categoryId) as number[]
      )
      form.setValue('photos', book.bookPhotos?.map(p => p.url) || [])
      form.setValue('author', book.author)
    }
  }, [book, form])

  // This is used so that we can select several categories for each book
  const handleItemSelect = (item: number) => {
    const newValue = form.getValues('category').slice()
    const itemIndex = newValue.indexOf(item)

    if (itemIndex === -1) {
      newValue.push(item)
    } else {
      newValue.splice(itemIndex, 1)
    }

    form.setValue('category', newValue)
  }

  const handleSubmit = async (values: z.infer<typeof catalogueSchema>) => {
    setProcessing(true)

    let message = 'Book added'

    if (book) {
      await updateBook({ ...values, path })
      message = 'book updated'
      setOpen(false)
    } else {
      await addBook({ ...values, path })
    }

    toast('Book added successfully')
    form.reset()
    setProcessing(false)
  }

  //   const handleFileAdd = async (filesToUpload: string[]) => {
  //     if (book) {
  //       const newPhoto = await addPhoto(
  //         'book',
  //         book.bookId,
  //         filesToUpload[0],
  //         path
  //       )

  //       if (newPhoto) {
  //         book.bookPhotos?.push(newPhoto)
  //       }
  //     }
  //     const existingPhotos = form.getValues('photos')
  //     form.setValue('photos', [...existingPhotos, ...filesToUpload])
  //   }

  //   const handleFileDelete = async (url: string) => {
  //     if (book) {
  //       const photoToDelete = book.bookPhotos?.filter(bp => bp.url === url)
  //       if (photoToDelete && photoToDelete.length > 0) {
  //         await deletePhoto('book', photoToDelete[0].photoId, path)
  //       }
  //     }
  //     const updatedPhotos = form.getValues('photos').filter(p => p !== url) ?? []
  //     form.setValue('photos', updatedPhotos)
  //   }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add book</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book name</FormLabel>
                    <FormControl>
                      <Input placeholder='book name' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='author'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder='last first' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isbn'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input placeholder='XXX-X-XX-XXXXXX-X' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='noOfCopies'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No of copies</FormLabel>
                    <FormControl>
                      <Input placeholder='1' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='publishYear'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish year</FormLabel>
                    <FormControl>
                      <Input placeholder='2024' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              'justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value.length > 0
                              ? field.value
                                  .map(
                                    val =>
                                      categories.find(
                                        c => c.category_id === val
                                      )?.category_name
                                  )
                                  .join(',')
                              : 'Select a category'}
                            <ChevronsUpDown className='opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[300px] p-0'>
                        <Command>
                          <CommandInput
                            placeholder='Search category...'
                            className='h-9'
                          />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {categories.map(category => (
                                <CommandItem
                                  value={category.category_name}
                                  key={category.category_id}
                                  onSelect={() =>
                                    handleItemSelect(category.category_id)
                                  }
                                >
                                  {category.category_name}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      field.value.includes(category.category_id)
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      If a book belongs to multiple categories please select
                      them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name='photos'
                render={({ field }) => (
                  <ImageDropzone
                    photos={field.value}
                    onFilesAdded={handleFileAdd}
                    onFileDelete={handleFileDelete}
                  />
                )}
              /> */}

              <div className='flex w-full flex-col space-y-2'>
                {processing ? (
                  <div className='flex'>
                    <Loader className='mr-2 animate-spin text-orange-500' />
                    Saving...
                  </div>
                ) : (
                  <Button type='submit'>Save</Button>
                )}
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddBookDialog
