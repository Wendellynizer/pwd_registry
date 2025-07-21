import React, { useEffect, useState } from 'react'
import Input from '../components/Inputs/Input'
import { useForm } from 'react-hook-form';
import Dropdown from '../components/Inputs/Dropdown';
import { fetchBarangays } from '../api/modules/barangay';
import { Link } from 'react-router';

const PersonnelForm = () => {

    const { register, handleSubmit} = useForm<any>({
        defaultValues: {
            firstname: '',
            lastname: '',
            middlename: '',
            email: '',
            password: '',
            role: '',
            assigned_barangay: ''
        }
    });

    const [showBarangay, setShowBarangay] = useState(false);
    const toggleBarangayDropdown = () => {
        setShowBarangay(!showBarangay);
    }

    const onSubmit = (data: any) => {
        console.log(data);
    }

    const [barangays, setBarangays] = useState({});
    
    useEffect(() => {
        const loadData = async() => {
            const response = await fetchBarangays();

            const barangayObject = Object.fromEntries(
        response.data.map((item: any) => [item.id, item.barangay_name])
            );

            setBarangays(barangayObject);
        }

        loadData();
    }, [])

    return (
    <>
        <p className='text-xl font-semibold mb-4'>Create Personnel</p>

        <div className='border border-base-300 rounded p-8'>
            <form onSubmit={handleSubmit(onSubmit)} method='POST'>
                <ColumnedContainer>
                    <Input 
                        label='First Name'
                        name='firstname'
                        register={register}
                    />

                    <Input 
                        label='Middle Name'
                        name='lastname'
                        register={register}
                    />

                    <Input 
                        label='Last Name'
                        name='middlename'
                        register={register}
                    />

                    <Input 
                        type='email'
                        label='Email'
                        name='email'
                        register={register}
                    />

                    <Input 
                        label='Password'
                        name='password'
                        register={register}
                    />

                    <Dropdown 
                        label='Role'
                        name='role'
                        options={{'1': 'Roving Personnel', '2': 'Admin'}}
                        register={register}
                        onChange={(e: any) => {
                            console.log(e.target.value);

                            if(e.target.value == '1')
                                setShowBarangay(true);
                            else {
                                setShowBarangay(false);
                                // empty the barangay value
                            }
                            
                        }}
                    />

                    {showBarangay && 
                        <Dropdown 
                            label='Assign a Barangay'
                            name='role'
                            options={barangays}
                            register={register}
                        />}
                    
                </ColumnedContainer>

                <div className='mt-5 flex justify-end gap-4'>
                    <Link to='/personnel' className='btn'>Cancel</Link>
                    <button type='button' className='btn btn-error'>Reset</button>
                    <button className='btn btn-success'>Create</button>
                </div>
            </form>
        </div>
        
    </>
    )
}

export default PersonnelForm

const ColumnedContainer = ({
  children,
  column = "grid-cols-3",
}: {
  children?: React.ReactNode;
  column?: string;
}) => {
  // return <div className="flex gap-4">{children}</div>;
  return <div className={`grid ${column} gap-4`}>{children}</div>;
}
