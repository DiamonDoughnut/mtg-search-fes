'use client'
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import AdvancedSearchForm from "./advanced-search-form"

const AdvancedSearch = () => {
 
  const [open, setOpen] = React.useState(false)
  const isDesktop = window.innerWidth > 797

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant={'secondary'} size={'lg'}>
                Advanced Search
              </Button>
        </DialogTrigger>
        <DialogContent className="max-sm:max-w-[425px] max-md:max-w-[550px] max-lg:max-w-[675px] max-w-[800px] max-h-[95vh] overflow-y-scroll"  id="advanced__search">
          <DialogHeader>
            <DialogTitle>Advanced Search</DialogTitle>
            <DialogDescription>
                Enter at least 1 listed field and click <span className="ms-mechanic">Submit</span> to search.
            </DialogDescription>
          </DialogHeader>
          <AdvancedSearchForm />
        </DialogContent>
      </Dialog>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="bg-slate-950 rounded-xl hover:bg-slate-800" asChild>
              <Button variant={'secondary'} size={'lg'}>
                Advanced Search
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[95vh] overflow-y-scroll">
              <DrawerHeader>
                <DrawerTitle>
                  Advanced Search
                </DrawerTitle>
                <DrawerDescription>
                  Enter at least 1 listed field and click <span className="ms-mechanic">Submit</span> to search.
                </DrawerDescription>
              </DrawerHeader>
              <AdvancedSearchForm />
            </DrawerContent>
          </Drawer>
  )
}
 



export default AdvancedSearch