import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';

import ColumnedContainer from '@/components/common/ColumnedContainer';
import Input from '@/components/inputs/Input'
import Dropdown from '@/components/inputs/Dropdown';

import { disabilityService } from '@/services/entities/disabilityService';
import { barangayService } from '@/services/entities/barangayService';

const DisabilityForm = () => {

    const { register, handleSubmit} = useForm<any>({
        defaultValues: {
           disability_type: 1,
           disability_name: ''
        }
    });


    const onSubmit = async(formData: any) => {
        try {
            const response = await disabilityService.create(formData);

            console.log(response);
            alert('Added Successfully');
        } catch(error) {
            alert('Error Adding');
        }
        
    }

    const [disabilities, setDisabilities] = useState({});
    
    useEffect(() => {
        const loadData = async() => {
        const data = await disabilityService.getAll();

            const disabilityObject = Object.fromEntries(
        data.map((item: any) => [item.id, item.disability_type_name])
            );

            setDisabilities(disabilityObject);
            console.log(data);
        }

        loadData();
    }, [])

    if(!disabilities) {
        return <p>Loading...</p>;
    }

    console.log(disabilities);

    return (
    <div className='p-5'>
        <p className='text-xl font-semibold mb-4'>Create Disability</p>

        <div className='border border-base-300 rounded p-8'>
            <form onSubmit={handleSubmit(onSubmit)} method='POST'>
                <ColumnedContainer column={2}>
                    <Dropdown 
                        label='Disability Type'
                        name='disability_type'
                        options={{
                            1: 'Hearing',
                            2: 'Intellectual Disability',
                            3: 'Learning Disability',
                            4: 'Mental Disability',
                            5: 'Physical Disability',
                            6: 'Psychosocial Disability',
                            7: 'Speech and Language Impairment',
                            8: 'Visual Disability',
                            9: 'Cancer (RA11215)',
                            10: 'Rare Disease (RA10747)',
                        }}
                        register={register}
                    />

                    <Input 
                        label='Name'
                        name='disability_name'
                        register={register}
                        placeholder='ex. Juan'
                    />

                </ColumnedContainer>

                <div className='mt-5 flex justify-end gap-4'>
                    <Link to='/disability' className='btn'>Cancel</Link>
                    <button type='button' className='btn btn-error'>Reset</button>
                    <button className='btn btn-success'>Create</button>
                </div>
            </form>
        </div>
        
    </div>
    )
}

export default DisabilityForm;