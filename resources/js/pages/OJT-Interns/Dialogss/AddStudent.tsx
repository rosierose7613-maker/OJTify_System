import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Plus} from 'lucide-react'; 
import {Separator} from '@/components/ui/separator';
import {Field, FieldGroup} from '@/components/ui/field';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Dialog, 
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogTitle
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export default function AddStudent() {

    const {data, setData, post, processing, errors, reset, recentlySuccessful  } = useForm ({
        name:'',
        studentid:'',
        company:'',
        overallhours:'',
        renderedhours:''
    });

    const [idExists, setIdExists] = useState(false);

        useEffect(() => {
        if (!data.studentid) return;
        fetch(`/api/check-studentid/${data.studentid}`)
            .then(res => res.json())
            .then(res => setIdExists(res.exists));
        }, [data.studentid]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("SUBMIT TRIGGERED");

        post('/interns', {
        onSuccess: () => {
            reset();
        },
        onError: (errors) => {
        if (errors.studentid) {
        alert("Student already exists!");
        }
    },
    });
};
  return (
      <div>
        <Dialog>
            <DialogTrigger asChild>
                   <Button className='text-white bg-blue-600 hover:bg-blue-700'>
                    <Plus/>
                        Add Student
                    </Button> 
                </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                 <form onSubmit={handleSubmit}>
                    <DialogHeader>
                    <DialogTitle>Add Student</DialogTitle>
                     <Separator/>
                    <DialogDescription>Add your student here. Click save when your done.</DialogDescription>                   
                </DialogHeader>
                <FieldGroup>
                    <div className='gap-4'>
                        {recentlySuccessful && (
                        <Alert className="bg-green-100 border-green-400 mt-2">
                            <InfoIcon />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                            Student successfully added!
                            </AlertDescription>
                        </Alert>
                        )}
                       {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <InfoIcon />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                            {Object.values(errors).map((err, i) => (
                                <div key={i}>{err}</div>
                            ))}
                            </AlertDescription>
                        </Alert>
                        )}
                    </div>
                <Field className='gap-4'>
                    <div className="space-y-2">
                    <Label>Student Name:</Label>
                    <Input 
                    placeholder="Student name..." 
                    value={data.name}
                    onChange={(e)=> setData('name', e.target.value)}/>
                    </div>
                </Field>
                <Field className='gap-4'>
                    <div className="space-y-2">
                    <Label>Student ID:</Label>
                    <Input
                    placeholder="Student Id..." 
                    inputMode="numeric"
                    maxLength={6}
                    value={data.studentid}
                    onChange={(e) =>setData('studentid', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                    </div>
                </Field>
                <Field className='gap-4'>
                    <div className="space-y-2">
                    <Label>Company:</Label>
                    <Input 
                    placeholder="Company name..." 
                    value={data.company} 
                    onChange={(e)=> setData('company', e.target.value)}/>
                    </div>
                </Field>
                <Field className="gap-4">
                    <div className="space-y-2">
                    <Label>Overall Hours:</Label>
                    <Input 
                    placeholder="Overall Hours..." 
                    value={data.overallhours} 
                    onChange={(e)=> setData('overallhours', e.target.value)}
                    />
                    </div>
                </Field>
                </FieldGroup>
            <DialogFooter className='pt-8'>
                <Button
                type="submit"
                disabled={processing || idExists} // disables Save if ID exists
                className="bg-blue-500 hover:bg-blue-700"
                >
                {processing ? 'Saving...' : idExists ? 'ID already exists' : 'Save'}
                </Button>
            </DialogFooter>
                         </form>
                </DialogContent>
            </Dialog>
      </div>
  )
}
