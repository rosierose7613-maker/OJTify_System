import {Field, FieldGroup} from '@/components/ui/field';
import {Separator} from '@/components/ui/separator';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {
    Dialog, 
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogTitle
} from '@/components/ui/dialog';
import {DropdownMenuItem} from '@/components/ui/dropdown-menu';


export default function Edit() {
    return (
            <div>
                <Dialog>
                <form>
                <DialogTrigger asChild>
                <DropdownMenuItem>
                    Edit
              </DropdownMenuItem>
                </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Student</DialogTitle>
                     <Separator/>
                    <DialogDescription>Edit this student here. Click save when your done.</DialogDescription>                   
                </DialogHeader>
                <FieldGroup>
                    <Field className='gap-4'>
                    <div className="space-y-2">
                    <Label>Student Name:</Label>
                    <Input 
                    placeholder="Student name..." />
                    </div>
                </Field>
                <Field className='gap-4'>
                    <div className="space-y-2">
                    <Label>Student ID:</Label>
                    <Input
                    placeholder="Student Id..." />
                    </div>
                </Field>
                <Field className='gap-4'>
                    <div className="space-y-2">
                    <Label>Company:</Label>
                    <Input 
                    placeholder="Company name..." />
                    </div>
                </Field>
                <Field className="gap-4">
                    <div className="space-y-2">
                    <Label>Overall Hours:</Label>
                    <Input 
                    placeholder="Overall Hours..."/>
                    </div>
                </Field>
                </FieldGroup>
                 <DialogFooter className='pt-8'>
                <Button className='bg-blue-500 hover:bg-blue-700'>
                    save
                </Button>
            </DialogFooter>
            </DialogContent>
                </form>
                </Dialog>
            </div>
    );
}
